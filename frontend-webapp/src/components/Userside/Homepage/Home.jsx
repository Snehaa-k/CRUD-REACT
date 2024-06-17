import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate()
  const cardsData = [
    { imgSrc: "https://m.media-amazon.com/images/I/81+9Gbu0isL._AC_UF1000,1000_QL80_.jpg", title: "ATOMIC HABITS", text: "James Clear" },
    { imgSrc: "https://junealholder.blog/wp-content/uploads/2019/05/img_20190505_155026_731.jpg", title: "The ALCHEMIST", text: "Paulo Coelho" },
    { imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcE8bCeGLWg_omyVAoBHhs681f2HkN1VgGZg6kzM-cbCI6unDrYGhQfXLdXxymD-5GqB8&usqp=CAU", title: "BRIGHT YOUNG WOMEN", text: " Emma's Biblio Treasures" },
   
  ];

  useEffect(()=>{
  const token = localStorage.getItem("access_token")
  if (!token){
    navigate('/')
    return
  }})
  return (
    <div className='homeimage text-center'>
        <h1 className='text-center mt-5 '>Pick Your Next Great Read..! </h1>
        <Row className='justify-content-center'>
        {cardsData.map((card, index) => (
          <Col key={index} md={3} className="mt-5"> 
            <Card style={{ width: '18rem', marginBottom: '30px'}}  className='bg-light' >
              <Card.Img variant="top" src={card.imgSrc} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>
                  {card.text}
                </Card.Text>
                <Button variant="secondary"> READ</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home