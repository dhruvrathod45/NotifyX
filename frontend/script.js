const socket =
io("http://localhost:5000");

const input =
document.getElementById(
  "notification-input"
);

const sendBtn =
document.getElementById(
  "send-btn"
);

const notificationsContainer =
document.getElementById(
  "notifications-container"
);

const toastContainer =
document.getElementById(
  "toast-container"
);

const notificationCount =
document.getElementById(
  "notification-count"
);

let unread = 0;

/* SEND */

sendBtn.addEventListener(
  "click",
  () => {

    const message =
    input.value.trim();

    if(message === ""){

      alert("Enter notification");

      return;
    }

    socket.emit(
      "send_notification",
      {
        message
      }
    );

    input.value = "";

  }
);

/* RECEIVE */

socket.on(
  "receive_notification",
  (data) => {

    unread++;

    notificationCount.innerText =
    unread;

    addNotification(data);

    showToast(data);

  }
);

/* ADD NOTIFICATION */

function addNotification(data){

  const div =
  document.createElement("div");

  div.classList.add(
    "notification"
  );

  div.innerHTML = `

    <h3>
      ${data.message}
    </h3>

    <p class="notification-time">
      ${new Date(data.time)
        .toLocaleTimeString()}
    </p>

  `;

  notificationsContainer.prepend(div);

}

/* TOAST */

function showToast(data){

  const toast =
  document.createElement("div");

  toast.classList.add("toast");

  toast.innerHTML = `

    <strong>
      New Notification
    </strong>

    <p style="margin-top:10px;">
      ${data.message}
    </p>

  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {

    toast.remove();

  }, 4000);

}