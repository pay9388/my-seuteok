async function search() {
  const id = document.getElementById('studentId').value.trim();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();
  const resultDiv = document.getElementById('result');

  try {
    const res = await fetch('student_db.json');
    const students = await res.json();

    const student = students.find(s =>
      String(s.학번).trim() === id &&
      String(s.이름).trim() === name
    );

    if (!student) {
      resultDiv.innerText = '일치하는 학생 정보가 없습니다.';
      return;
    }

    if (String(student.비밀번호).trim() !== password) {
      resultDiv.innerText = '비밀번호가 틀렸습니다.';
      return;
    }

    resultDiv.innerHTML = `<strong>${student.이름}</strong>님의 세특:<br><br>${student.세특}`;
  } catch (error) {
    resultDiv.innerText = '데이터를 불러오지 못했습니다.';
  }
}
