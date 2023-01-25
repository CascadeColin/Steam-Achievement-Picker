async function feedbackFormHandler(event) {
    event.preventDefault();

    const comment_body = document.querySelector('#feeback_text').value.trim();

    // parse URL to get achievement id
    const achievement_id = window.location.href.slice(41)
    console.log(typeof comment_body,typeof achievement_id)


    if (comment_body) {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({
                comment_body,
                achievement_id,
                
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

const btn = document.querySelector('#submit_btn')
btn.addEventListener('click', feedbackFormHandler);