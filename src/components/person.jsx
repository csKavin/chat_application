import React from 'react'

function Index(props) {
  let { details, credentials, sendDataToParent } = props;
  const [childData, setChildData] = React.useState('');
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
      <div className='mt-2'>
        <div className=' card p-2 text-center pointer' onClick={() => ChatId(details)}>
          <div className='fw-bold'>{temp_name[0]?.person?.username}</div>
          {
            details?.last_message?.text ?
              <div>recent : {details?.last_message?.text}</div> : null
          }
          {details?.last_message?.sender?.is_online ? <>online</> : <>offline</>}
        </div>
      </div>
    </>
  )
}

export default Index;