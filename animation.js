import { questions } from './questions.js';

// Hàm hiển thị danh sách câu hỏi
function renderQuestions() {
    const questionsContainer = document.getElementById("questionsContainer");
    questionsContainer.innerHTML = ""; // Xóa nội dung cũ

    // Duyệt qua danh sách câu hỏi và tạo HTML cho từng câu
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        // Tạo nội dung HTML cho câu hỏi
        questionDiv.innerHTML = `
            <p>${q.question}</p>
            ${Object.keys(q.options)
                .map(
                    (key) =>
                        `<label><input type="radio" name="q${index}" value="${key}"> ${key}. ${q.options[key]}</label><br>`
                )
                .join("")}
        `;

        questionsContainer.appendChild(questionDiv);
    });
}

// Hàm xử lý khi nộp bài
function submitQuiz() {
    let score = 0; // Điểm số
    let resultHTML = ""; // Nội dung kết quả

    // Duyệt qua từng câu hỏi và kiểm tra đáp án
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(
            `input[name="q${index}"]:checked`
        )?.value;

        if (selectedAnswer === q.correctAnswer) {
            score++; // Tăng điểm nếu đúng
        } else {
            resultHTML += `<p>${q.question}: Sai! Đáp án đúng là ${q.correctAnswer}</p>`;
        }
    });

    // Hiển thị kết quả trong popup
    resultHTML =
        `<p>Điểm của bạn là ${score}/${questions.length}</p>` + resultHTML;
    document.getElementById("result").innerHTML = resultHTML;

    // Hiển thị popup kết quả
    document.getElementById("resultPopup").style.display = "block";
}

// Hàm đóng popup kết quả
function closePopup() {
    document.getElementById("resultPopup").style.display = "none";
}

// Hiển thị các câu hỏi khi trang được tải
document.addEventListener("DOMContentLoaded", renderQuestions);
