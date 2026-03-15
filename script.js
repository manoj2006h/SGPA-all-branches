document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector(".submit-btn");

    function getGradePoint(marks) {
        if (marks >= 90 && marks <= 100) return 10;      // O
        else if (marks >= 80) return 9;                  // A+
        else if (marks >= 70) return 8;                  // A
        else if (marks >= 60) return 7;                  // B+
        else if (marks >= 55) return 6;                  // B
        else if (marks >= 50) return 5;                  // C
        else if (marks >= 40) return 4;                  // P
        else return 0;                                   // F
    }

    button.addEventListener("click", function () {

        const rows = document.querySelectorAll("table tr");

        let totalCredits = 0;
        let totalPoints = 0;
        let hasFail = false;

        for (let i = 1; i < rows.length; i++) {

            const credit = parseFloat(rows[i].children[1].textContent);
            const marksInput = rows[i].children[2].querySelector("input");
            const marks = parseFloat(marksInput.value);

            if (isNaN(marks) || marks < 0 || marks > 100) {
                alert("Please enter valid marks (0-100) for all subjects.");
                return;
            }

            const gradePoint = getGradePoint(marks);

            if (gradePoint === 0) {
                hasFail = true;
            }

            totalCredits += credit;
            totalPoints += gradePoint * credit;
        }

        const sgpa = totalPoints / totalCredits;

        displayResult(sgpa, hasFail);
    });

    function displayResult(sgpa, hasFail) {

        let resultDiv = document.querySelector(".result");

        if (!resultDiv) {
            resultDiv = document.createElement("div");
            resultDiv.classList.add("result");
            resultDiv.style.textAlign = "center";
            resultDiv.style.marginTop = "20px";
            document.querySelector(".tables").appendChild(resultDiv);
        }

        if (hasFail) {
            resultDiv.innerHTML = `
                <h2>Your SGPA: ${sgpa.toFixed(2)}</h2>
                <p style="color:red;">⚠ You have failed in one or more subjects</p>
            `;
        } else {
            resultDiv.innerHTML = `
                <h2>Your SGPA: ${sgpa.toFixed(2)}</h2>
            `;
        }
    }

});
