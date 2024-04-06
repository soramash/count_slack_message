// Counts the number of messages posted by a specific user on Slack for a given date and posts the result.
function mainCountSlackMessage() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const token = scriptProperties.getProperty('SLACK_NOTICE_BOT_TOKEN');
  const userId = scriptProperties.getProperty('SLACK_USER_ID');
  const userName = scriptProperties.getProperty('SLACK_USER_NAME');
  const date = getYesterdaysDateFormatted();
  const numofMessages = countSlackMessagesForDate(token, date, userId);
  const numOfMessagesTwoDaysAgo = scriptProperties.getProperty('NUM_OF_SLACK_POST_MESSAGES_2_DAYS_AGO');
  
  // Updates the message count for two days ago.
  scriptProperties.setProperty('NUM_OF_SLACK_POST_MESSAGES_2_DAYS_AGO', numofMessages.toString());

  let additionalMsg = compareMessageCounts(numOfMessagesTwoDaysAgo, numofMessages);
  const message = `${userName} posted ${numofMessages} messages on Slack yesterday, which is ${additionalMsg}`;
  
  const webhookUrl = scriptProperties.getProperty('SLACK_WEBHOOK_URL');
  postMessageToSlack(webhookUrl, message);
}

// Gets yesterday's date in yyyy-mm-dd format.
function getYesterdaysDateFormatted() {
  const today = new Date();
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  return Utilities.formatDate(yesterday, Session.getScriptTimeZone(), "yyyy-MM-dd");
}

// Counts the number of Slack messages posted by a user on a specific date.
function countSlackMessagesForDate(token, date, userId) {
  const query = `on:${date} from:<@${userId}>`;
  const apiUrl = 'https://slack.com/api/search.messages';
  const parameters = {
    method: 'get',
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(`${apiUrl}?query=${encodeURIComponent(query)}`, parameters);
  const jsonResponse = JSON.parse(response.getContentText());

  if (jsonResponse.ok) {
    Logger.log(`Total messages for ${date}: ${jsonResponse.messages.total}`);
    return jsonResponse.messages.total;
  } else {
    Logger.log(`Error: ${jsonResponse.error}`);
    return 0;
  }
}

// Compares message counts and creates a notification message.
function compareMessageCounts(previousCount, currentCount) {
  if (previousCount > currentCount) {
    return "less than two days ago. :face_with_hand_over_mouth:";
  } else if (previousCount < currentCount) {
    return "more than two days ago. :chart_with_upwards_trend:";
  } else {
    return "the same as the day before yesterday. :dart:";
  }
}

// Posts a message to Slack.
function postMessageToSlack(webhookUrl, message) {
  const payload = { text: message };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(webhookUrl, options);
  Logger.log(response.getContentText());
}
