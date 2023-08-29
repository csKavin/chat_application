import React from 'react'

function Index(props) {
  let { details, credentials, sendDataToParent } = props;
  const [childData, setChildData] = React.useState('');
  console.log(props, "props");
  const invidualChat = details?.people;
  const temp_name = invidualChat.filter((item) => {
    return item?.person?.username !== credentials.UserName;
  });
  const ChatId = (e) => {
    setChildData(e.id)
    sendDataToParent(e.id);
  }
  return (
    <>
      <div className='fw-bold' onClick={() => ChatId(details)}>{temp_name[0]?.person?.username}</div>
      <hr />
    </>
  )
}

export default Index;