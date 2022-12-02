export const createWindowNotification = ({ title, body, data, onClick, onClose, onError, onShow }) => {
  try {
    if (!title || title === "" || !body || body === "") {
      console.error("Missing params for 'createWindowNotification' function");
      return;
    }

    if (typeof title !== "string" || typeof body !== "string") {
      console.error("Wrong type of params for 'createWindowNotification' function");
      return;
    }

    function notify({ title, body, data, onClick, onClose, onError, onShow }) {
      if (data === undefined) data = [];
      if (onClick === undefined) onClick = () => {};
      if (onClose === undefined) onClose = () => {};
      if (onError === undefined) onError = () => {};
      if (onShow === undefined) onShow = () => {};

      const icon = "../favicon.ico";

      const notification = new Notification(title, {
        body: body,
        icon: icon,
        data: data,
      });

      notification.onclick = e => onClick(e, notification);
      notification.onclose = e => onClose(e, notification);
      notification.onerror = e => onError(e, notification);
      notification.onshow = e => onShow(e, notification);
    }

    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      notify({ title, body, data, onClick, onClose, onError, onShow });
    } else if (Notification.permission === "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          notify({ title, body, data, onClick, onClose, onError, onShow });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};
