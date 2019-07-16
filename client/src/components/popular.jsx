import React from 'react'
import $ from "jquery";
import PhotoList from './photoList.jsx';
import PopHeader from './header.jsx';
import style from '../style.css';
// import axios from 'axios'

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }

        this.scrollLeft = this.scrollLeft.bind(this)
        this.scrollRight = this.scrollRight.bind(this)
        this.clickScroll = this.clickScroll.bind(this)
    }

componentDidMount() {
    $.ajax({
        method: 'GET',
        url: '/munch-popular',
        success: (data) => {
            // console.log(data)
            this.setState(() => {
                return {list: data};
              });
        }
     });
}


// axios.get('/munch-popular')
//     .then(({data}) => this.setState(() => {list:data}))
//     .catch((err)=>console.log(err))
//     $.ajax({
//     method: 'GET',
//     url: '/munch-popular',
//     success: (data) => {
//         // console.log(data)
//         this.setState(() => {
//             return {list: data};
//           });
//     }
//  });
clickScroll(container,scoll,miliSec,distance,value){
    var count = 0;
    const scrollInterval = setInterval(function(){
        if(scoll == 'scrollLeft'){
            container.scrollLeft -= value;
        } else {
            container.scrollLeft += value;
        }
        count += value;
        if(count >= distance){
            clearInterval(scrollInterval);
        }
    }, miliSec);
}

scrollLeft() {
    const container = document.getElementById('containerForContent');
    this.clickScroll(container,'scrollLeft',5,610,10);
} 

scrollRight() {
    const container = document.getElementById('containerForContent');
    this.clickScroll(container,'scrollRight',5,610,10);
}


render() {
    return(
        <div className = {style.moduleContainer}>  
        <div><PopHeader
        scrollLeft = {this.scrollLeft} 
        scrollRight = {this.scrollRight}
        /></div>
        <div><PhotoList data = {this.state.list}/> </div>
         </div>
        )
    }
}

export default Popular

