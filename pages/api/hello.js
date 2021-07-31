



const Hello = () => (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      break
    case 'POST':
      break
    case 'UPDATE':
      break;
    case 'DELETE':
      break;
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.end()
  }



  res.status(200).json({ name: 'John Doe' })
}


export default Hello
