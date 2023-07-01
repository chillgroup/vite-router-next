import { useParams } from 'react-router-dom'

const MemberDetailPage = () => {
  const { id } = useParams()
  return <div>Member Detail Page. User ID: {id}</div>
}

export default MemberDetailPage
