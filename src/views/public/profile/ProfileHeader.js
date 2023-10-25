import { Card, CardImg } from "reactstrap"

export default function ProfileHeader({ data }) {
  return (
    <Card className='profile-header mb-2'>
      <CardImg src={data.headerpic} style={{ height: 400 }} top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img d-flex align-items-center'>
            <img className='rounded img-fluid' src={data.logo} alt={data.smeName} />
          </div>
          <div className='profile-title mt-2 ms-2'>
            <h2 className='text-white'>{data.smeName}</h2>
            <p className='text-white'>{data.managerName}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
