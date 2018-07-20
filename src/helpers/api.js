export const setCreds = ({ dbName, apiKey, username }) => {
  localStorage.setItem('dbName', dbName)
  localStorage.setItem('apiKey', apiKey)
  localStorage.setItem('username', username)
}

export const getCreds = () => ({
  dbName: localStorage.getItem('dbName'),
  apiKey: localStorage.getItem('apiKey'),
  username: localStorage.getItem('username'),
})

export const removeCreds = () => {
  localStorage.removeItem('dbName')
  localStorage.removeItem('apiKey')
  localStorage.removeItem('username')
}

const headers = () => ({
  'content-type': 'application/json',
  'x-apikey': getCreds().apiKey,
  'cache-control': 'no-cache',
})

const db = (collection, method = 'GET', data = null) => new Promise((resolve, reject) => {
  fetch(`https://${getCreds().dbName}.restdb.io/rest/${collection}`, {
    method,
    headers: headers(),
    mode: 'cors',
    body: data && JSON.stringify(data),
  })
    .then(res => res.json())
    .then(resolve)
    .catch(reject)
})

export const saveEstimate = ({
  _id,
  text,
  graphData = [],
  project,
  calculated,
}) => {
  const options = _id === 'new'
    ? ['estimates', 'POST']
    : [`estimates/${_id}`, 'PUT']
  return db(...options, ({
    text,
    graphData,
    project,
    calculated,
    modifiedBy: getCreds().username,
  }))
}

export const getEstimate = ({ estimateId }) => db(`estimates/${estimateId}`)

export const checkCreds = () => db('estimates?totals=true&count=true')