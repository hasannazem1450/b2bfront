import { Row, Col, Card, Container } from "reactstrap"
import { useTranslation } from "react-i18next"
import organizationImage from '../../../assets/images/profileSelector/organization.png'
import organizationImage2 from '../../../assets/images/profileSelector/organization1.png'
import personType from '../../../assets/images/profileSelector/personal.png'
// import ProductList from "../shop/ProductList"
import { useNavigate} from "react-router-dom"
import './profileSelector.css'

export default function ProfileChose() {
  const { t: translate } = useTranslation("profileSelector")
  const navigate = useNavigate()
 
  
  return (
  
 <Container className="choseProfileContainer"  >

       <Row className="justify-content-md-center choseCard">
        <Col  md="6" className="profileChoseCard_personal" >
        <div style={{textAlign:'center'}}  onClick={() => navigate("/wizard", { replace: true })}>
          <img className="profileChoseCard_icon" src={personType}/>
  
            <label className="centerInDiv">{translate("personal")}</label>
        </div>
        </Col>
        <Col  md="6" className="profileChoseCard_legal">
        <div style={{textAlign:'center'}} onClick={() => navigate("/wizard", { replace: true })}>
        <img className="profileChoseCard_icon" src={organizationImage2}/>
  
            <label className="centerInDiv">{translate("legal")}</label>
        </div>
        </Col>
      </Row>
    

    </Container>

  )
}
