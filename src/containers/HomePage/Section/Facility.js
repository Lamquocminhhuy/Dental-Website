import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Facility.scss'
import Slider from 'react-slick';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
class Facility extends Component {

    render() {
       
       

        return (
            <div className="section-share section-facility">
            <div className="section-container">
              <div className="section-header">
                <span className="title-section">Dịch vụ của phòng khám</span>
    
              </div>
              <div className="section-body row">
                <div className="col-3">
                <Card className="card">
        <CardImg top width="100%" src="https://nhakhoatandinh.com/wp-content/uploads/2020/01/cao-voi-rang-nha-khoa-tan-dinh.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Cạo vôi răng</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Giá 200.000 VND</CardSubtitle>
          <CardText>Làm sạch vôi răng, khiến vôi răng không kịp kết dính, vi khuẩn không có môi trường phát triển.</CardText>
       
        </CardBody>
      </Card>
                </div>
                <div className="col-3">
                <Card className="card">
        <CardImg top width="100%" src="https://nhakhoatandinh.com/wp-content/uploads/2020/01/nieng-rang-nha-khoa-tan-dinh.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Niềng răng</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Giá 200.000 VND</CardSubtitle>
          <CardText>Niềng răng (nẹp răng) là biện pháp khắc phục các khiếm khuyết về răng như: răng thưa, hô, móm, mọc chen chúc, không đúng vị trí, khớp cắn sâu, lệch… </CardText>
          
        </CardBody>
      </Card>
                </div>
                <div className="col-3">
                <Card className="card">
        <CardImg top width="50%" src="https://nhakhoatandinh.com/wp-content/uploads/2020/01/rang-su-nha-khoa-tan-dinh.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Bọc răng sứ</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Giá 200.000 VND</CardSubtitle>
          <CardText>Bọc răng sứ là thủ thuật “khoác thêm một lớp áo ngoài” giúp khắc phục tình trạng răng hư tổn, răng bị mất, hay răng bị thưa, bị hô… </CardText>
   
        </CardBody>
      </Card >
                </div>
                <div className="col-3">
                <Card className="card">
        <CardImg top width="100%" src="https://nhakhoatandinh.com/wp-content/uploads/2020/01/nho-rang-khong-dau-nha-khoa-tan-dinh-piezotome.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Nhổ răng </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Giá 200.000 VND</CardSubtitle>
          <CardText>Công nghệ nhổ răng, tiểu phẫu an toàn không đau tại Nha Khoa Smile được thực hiện bằng máy phẫu thuật siêu âm Piezotome an toàn và không xâm lấn đến những mô mềm quanh răng.</CardText>
   
        </CardBody>
      </Card>
                </div>
              </div>
    
            </div>
    
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
