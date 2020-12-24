import axios from "axios";

export const errorLog = (error: Error) => {
  process.env.APP_DEBUG === "true" ? console.log(`error: ${error.name} ${error.message}`) : null;

  if (process.env.APP_ENV == "production") {
    if (process.env.APP_LOG === "mattermost") {
      let payload = {
        "text": `${error.name} - ${error.message} - ${error.stack}`,
        "username": "Bug Bot"
      }
      axios.post(process.env.LOG_WEBHOOK, payload).then(r => {

      }).catch(e => {
        console.log(`${error.name} - ${error.message} - ${error.stack}`)
      })
    }
  }
};


export const activityLog = (message) => {
  if (process.env.APP_ENV == "production") {
    if (process.env.APP_LOG === "mattermost") {
      let payload = {
        "text": message,
        "username": "Kết Nối Việc"
      }
      axios.post(process.env.ACTIVITY_WEBHOOK, payload).then(r => {

      }).catch(e => {
        console.log(e.toString())
      })
    }
  }
}
