document.addEventListener("DOMContentLoaded", () => {
  const subjects = [
    { name: "Chemistry", credits: { theory: 3, practical: 1 } },
    { name: "EGD", credits: { theory: 2, practical: 2 } },
    { name: "PC", credits: { theory: 2, practical: 1 } },
    { name: "PCC", credits: { theory: 3, practical: 1 } },
    { name: "Drama/Photography", credits: { theory: 1, practical: 1 } },
    { name: "Maths", credits: { theory: 4, practical: 0 } },
    { name: "IKS", credits: { theory: 0, practical: 2 } },
  ];

  const gradePoints = {
    "A+": 10,
    A: 9,
    "B+": 8,
    B: 7,
    "C+": 6,
    C: 5,
    D: 4,
    F: 0,
  };

  const subjectsContainer = document.getElementById("subjects");

  // Dynamically create rows for each subject
  subjects.forEach((subject, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${subject.name}</td>
      <td>${subject.credits.theory}</td>
      <td>
        <select id="gradeTheory${index}">
          <option value="">Select Grade</option>
          ${Object.keys(gradePoints)
            .map((grade) => `<option value="${grade}">${grade}</option>`)
            .join("")}
        </select>
      </td>
      <td>${subject.credits.practical}</td>
      <td>
        ${
          subject.credits.practical > 0
            ? `<select id="gradePractical${index}">
                 <option value="">Select Grade</option>
                 ${Object.keys(gradePoints)
                   .map((grade) => `<option value="${grade}">${grade}</option>`)
                   .join("")}
               </select>`
            : "-"
        }
      </td>
    `;

    subjectsContainer.appendChild(row);
  });

  const calculateBtn = document.getElementById("calculateBtn");
  const resultDiv = document.getElementById("result");

  calculateBtn.addEventListener("click", () => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((subject, index) => {
      const theoryGrade = document.getElementById(`gradeTheory${index}`).value;
      const practicalGrade =
        subject.credits.practical > 0
          ? document.getElementById(`gradePractical${index}`).value
          : null;

      if (theoryGrade) {
        totalPoints += gradePoints[theoryGrade] * subject.credits.theory;
        totalCredits += subject.credits.theory;
      }

      if (practicalGrade) {
        totalPoints += gradePoints[practicalGrade] * subject.credits.practical;
        totalCredits += subject.credits.practical;
      }
    });

    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;

    resultDiv.innerHTML = `Your SGPA is: <strong>${sgpa}</strong>`;
  });
});
