import React, { useEffect, useReducer } from "react";
// import "../../components/homeContent/fillerDiv.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { axiosInstance, refreshToken } from '../../utils'
import { Card, Row, Col } from 'react-bootstrap';
import reducer from '../../onlineAcademyReducer';
import ApppContext from '../../onlineAcademyAppContext';

function FillerDiv() { 
  const initialAppState = {
    query: '',
    items: []
  }

  const [store, dispatch] = useReducer(reducer, initialAppState);

  useEffect(function() {
    async function loadCourses() {
      const res = await axiosInstance.get("/courses");
      console.log(res);
      dispatch({
        type: 'loadCourses',
        payload: {
          items: res.data,
          query: ''
        }
      });
    }
    loadCourses();
  }, []);

  return (
    <div>
      <ApppContext.Provider value={{store, dispatch}}>
      {store.items.map(item => 
      <Card key={item.id}>
        <Card.Body>
          <Card.Title><center>{item.title}</center></Card.Title>
          <Card.Text>{item.descriptionShort}</Card.Text>
        </Card.Body>
      </Card>
      )}
      {/* {
        console.log(store.items)
      } */}
      </ApppContext.Provider>
    </div>
  );
}

export default FillerDiv;
