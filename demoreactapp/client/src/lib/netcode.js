

const callEnqueue = async (message) => {
    return fetch(`/enqueue/${ADMIN_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then(result => {
        return result.json();
    });
  };

  const onMessage = (message) => {
      setState({data: message})
  }

  const callDequeue = async (id, callback) => {
    const response = await fetch(`/dequeue/${id}`);
    const body = await response.json();
    if(body.empty === false) {
        callback(body.message)
    }
  };

  const subscribeTo = (id, callback) => {
    let intervalId = setInterval(() => callDequeue(id, callback),1000)
    return () => {
        clearInterval(intervalId)
    }
  }


  if(interval !== undefined) clearInterval(interval);
  interval = setInterval(callDequeue, 1000);
  var enqueueMessage = (e) => {
    if (e.target.id === "enqueueButton") {
      callEnqueue()
      .catch(err => console.log(err));
    }
  }