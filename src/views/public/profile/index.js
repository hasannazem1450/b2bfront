import { Fragment, useState, useEffect } from "react"
import { Row, Col } from "reactstrap"
import ProfileHeader from "./ProfileHeader"
import ProfileAbout from "./ProfileAbout"
import ProfileMembers from "./ProfileMembers"
import ProfileNews from "./ProfileNews"
import ProfileProducts from "./ProfileProducts"
import "@styles/react/pages/page-profile.scss"
import "@styles/react/apps/app-ecommerce.scss"
import { showNews } from "../../../api/profileview"
import { getProfile } from "../../../api/profile"

export default function Profile() {
  const fakeData = {
    cover: require("@src/assets/images/banner/steel-facory.png").default,
    avatar: require("@src/assets/images/avatars/fooladeMobaarake.jpg").default,
    brandname: "فولاد مباركه اصفهان",
    activity: "فلزات اساسي",
    about:
      "شرکت فولاد مبارکه از شرکت‌های پیشرو ایرانی است که در زمینه تولید ورق‌های فولادی فعالیت‌ می‌نماید. این شرکت با ماموریت ایفای نقش محوری در توسعه صنعتی، اقتصادی و اجتماعی کشور و ارتقای سطح فناوری صنعت فولاد، به عنوان سازمانی جهان تراز سهم عمده‌ای از تولید فولاد کشور را جهت استفاده در صنایع خودروسازی و قطعه‌سازی، صنایع فلزی سبک، صنایع فلزی سنگین و لوله‌های انتقال سیالات، صنایع بسته‌بندی، صنایع لوازم خانگی و الکتریکی و صنایع لوله و پروفایل تولید می‌نماید.",
    address: "ایران، اصفهان",
    email: "saham@msc.ir",
    website: "http://www.msc.ir/",
    boardMembers: [
      {
        id: 1,
        avatar: require("@src/assets/images/portrait/portrait1.jpg").default,
        name: "دکتر مهویدی",
        position: "مدیر عامل"
      },
      {
        id: 2,
        avatar: require("@src/assets/images/portrait/portrait1.jpg").default,
        name: "مهندس ناظم",
        position: "برنامه نویس"
      },
      {
        id: 3,
        avatar: require("@src/assets/images/portrait/portrait1.jpg").default,
        name: "مهندس فدوی",
        position: "عضو هیئت مدیره"
      },
      {
        id: 4,
        avatar: require("@src/assets/images/portrait/portrait2.jpg").default,
        name: "خانم لامعی",
        position: "مدیر مالی"
      }
    ],
    news: [
      {
        id: 1,
        date: "1401/06/07",
        title: "زمانبندی پرداخت سود دوره ۱۲ ماهه منتهی به ۱۴۰۰/۱۲/۲۹(اصلاحیه)",
        headline : "زمانبندی پرداخت سود دوره ۱۲ ماهه منتهی به ۱۴۰۰/۱۲/۲۹(اصلاحیه)"
      },
      {
        id: 2,
        date: "1401/06/20",
        title: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰",
        headline: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰"
      },
      {
        id: 3,
        date: "1401/06/20",
        title: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰(اصلاحیه)",
        headline: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰"
      },
      {
        id: 4,
        date: "1401/06/20",
        title: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰(اصلاحیه)",
        headline: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰"
      },
      { 
        id: 5,
        date: "1401/06/222",
        title: "افشای اطلاعات بااهمیت - (سایر اطلاعات بااهمیت - مصوبه هیات مدیره در خصوص برنامه فروش سهام خزانه- گروه ب) منتهی به سال مالی ۱۴۰۱/۱۲/۲۹",
        headline: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰"
      },
      {
        id: 6,
        date: "1401/06/23",
        title: "مشخصات کمیته حسابرسی و واحد حسابرسی داخلی",
        headline: "آگهی دعوت به مجمع صندوق سرمایه گذاری در تاریخ ۱۴۰۱/۰۶/۲۰"
      }
    ]
  }

  const [profileData, setprofileData] = useState([])
   
  const getprofileData = async (e) => {
    try {
      const response = await getProfile()
      console.log(response.data.result.dto)
      setprofileData(response.data.result.dto)

    } catch (error) {
      console.log(error.message)
    }
  }

  const showNewsFn = async () => {
    try {
      const response = await showNews()
      console.log(response)
      dispatch(showNews())
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    //console.log(domainId);
    getprofileData()
   showNewsFn()

  }, [])
  return (
    <Fragment>
      <div id='user-profile'>
        <Row>
          <Col sm='12'>
            <ProfileHeader data={profileData} />
          </Col>
        </Row>
      </div>
      <section id='profile-info'>
        <Row>
          <Col lg={3} sm={12}>
            <ProfileAbout data={profileData} />
            <ProfileMembers data={fakeData.boardMembers} />
            {/* <ProfileNews data={fakeData.news} /> */}
           </Col>
          <Col lg={6} sm={12}>
            <ProfileProducts activeView='list' />
          </Col>
          <Col lg={3} sm={12}>
            {/* <ProfileAbout data={fakeData} />
            <ProfileMembers data={fakeData.boardMembers} /> */}
            <ProfileNews data={fakeData.news} />
          </Col>
        </Row>
      </section>
    </Fragment>
  )
}
