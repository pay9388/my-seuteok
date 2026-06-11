async function search() {
  const id = document.getElementById('studentId').value.trim();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();
  const resultDiv = document.getElementById('result');

  const showError = (msg) => {
    resultDiv.className = 'error';
    resultDiv.innerText = msg;
  };

  try {
    if (location.protocol === 'file:') {
      showError('파일을 직접 열면 조회할 수 없습니다. 로컬 서버나 GitHub Pages 주소로 접속하세요.');
      return;
    }
    if (typeof XLSX === 'undefined') {
      showError('엑셀 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 새로고침하세요.');
      return;
    }
    const res = await fetch('db.xlsx', { cache: 'no-store' });
    if (!res.ok) {
      showError('db.xlsx 파일을 찾을 수 없습니다. 저장소에 업로드되었는지 확인하세요.');
      return;
    }
    const buf = await res.arrayBuffer();
    const wb = XLSX.read(buf);
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    // 한 행 = 한 학생의 한 과목 세특. 같은 학생의 행을 모두 모은다.
    const records = rows.filter(r =>
      String(r.학번).trim() === id &&
      String(r.이름).trim() === name
    );

    if (records.length === 0) {
      showError('일치하는 학생 정보가 없습니다.');
      return;
    }

    if (!records.some(r => String(r.비밀번호).trim() === password)) {
      showError('비밀번호가 틀렸습니다.');
      return;
    }

    // 최신 학기부터: 학년도 내림차순 → 학기 내림차순
    records.sort((a, b) =>
      (Number(b.학년도) || 0) - (Number(a.학년도) || 0) ||
      (Number(b.학기) || 0) - (Number(a.학기) || 0)
    );

    resultDiv.className = '';
    resultDiv.innerHTML = '';
    const title = document.createElement('p');
    title.className = 'result-title';
    const nameEl = document.createElement('strong');
    nameEl.textContent = name;
    title.append(nameEl, '님의 세특');
    resultDiv.appendChild(title);

    let currentSemester = null;
    for (const r of records) {
      // 학년도/학기/과목 값이 비어 있으면 해당 라벨만 생략하고 세특은 그대로 표시
      const semester = (r.학년도 != null && r.학기 != null)
        ? `${r.학년도}학년도 ${r.학기}학기` : '';
      if (semester && semester !== currentSemester) {
        currentSemester = semester;
        const semesterEl = document.createElement('div');
        semesterEl.className = 'semester-title';
        semesterEl.textContent = semester;
        resultDiv.appendChild(semesterEl);
      }
      if (r.과목 != null && String(r.과목).trim() !== '') {
        const subjectEl = document.createElement('div');
        subjectEl.className = 'subject-title';
        subjectEl.textContent = String(r.과목);
        resultDiv.appendChild(subjectEl);
      }
      const textEl = document.createElement('div');
      textEl.className = 'setuk-text';
      textEl.textContent = String(r.세특 ?? '');
      resultDiv.appendChild(textEl);
    }
  } catch (error) {
    showError('데이터를 불러오지 못했습니다.');
  }
}
