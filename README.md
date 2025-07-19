
# my-seuteok

학생이 학번, 이름, 비밀번호를 입력하면 본인의 세부능력 및 특기사항(세특)을 조회할 수 있는 웹페이지입니다.  
본 시스템은 GitHub Pages를 통해 누구나 접속 가능하며, `student_db.json` 파일을 수정함으로써 쉽게 학생 정보를 갱신할 수 있습니다.

---

## 🔧 구성 파일

| 파일명             | 설명 |
|------------------|------|
| `index.html`     | 사용자 입력 폼과 결과 출력 HTML 페이지 |
| `script.js`      | 입력값 검증 및 JSON 데이터 검색 로직 |
| `style.css`      | 반응형 모바일 대응 디자인 |
| `student_db.json`| 학생 정보 DB (엑셀에서 변환된 JSON 파일) |

---

## 🚀 사용 방법

1. 이 저장소를 GitHub에 업로드합니다. (예: `my-seuteok`)
2. `student_db.json` 파일을 엑셀 기반으로 갱신합니다.
3. GitHub Pages를 활성화하여 웹사이트로 공개합니다.
   - `Settings > Pages > Source`에서 `main` 브랜치의 `/ (root)` 선택
   - URL이 생성되면 누구나 접속하여 조회 가능

---

## 📁 엑셀 → JSON 변환법

엑셀 파일(`db.xlsx`)을 Python으로 다음과 같이 변환합니다:

```python
import pandas as pd
df = pd.read_excel("db.xlsx")
df.to_json("student_db.json", orient="records", force_ascii=False, indent=2)
```

---

## ⚠️ 보안 유의사항

- 실제 운영 시 비밀번호는 암호화 저장을 권장합니다.
- 민감 정보가 외부에 노출되지 않도록 student_db.json 파일을 주기적으로 점검하세요.

---
