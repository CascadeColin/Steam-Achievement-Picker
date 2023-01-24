const achievement_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
console.log(achievement_id)

async function feedbackFormHandler(event) {
    event.preventDefault();

    const feedback_text = document.querySelector('#feeback_text').value.trim();

    const achievement_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(achievement_id)

    if (feedback_text) {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({
                achievement_id,
                feedback_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            // document.querySelector('.feedback-form-container').style.display = "block";
        }
    }
}

document.querySelector('.feedback-form-container').addEventListener('submit', feedbackFormHandler);