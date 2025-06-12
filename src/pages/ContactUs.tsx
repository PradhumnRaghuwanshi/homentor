import React from 'react'
import { useEffect  } from 'react'


function ContactUs() {
    useEffect(()=>{ window.scrollTo(0,0) },[])

  return (
    <>
    
      <div style={{backgroundColor:"rgb(245,247,250)"}} className="container-fluid ">
        <div className="container">
        <div className="row p-0  m-0 ">
          <div  className="col-md-12 py-5 my-auto">
            <div style={{ fontSize: 38, fontWeight: 600}}>
            HOMENTOR CONTACT & SUPPORT

            </div>

          
            <div className='fs-5 mt-3' >
            After raising a support ticket, please give us 24 hours and our customer support representative will reach out to you via Phone Call.             </div>
          </div>
        </div>
        </div>
        </div>



        <div className="container">
        <div className="row">
          <div className="col-12 py-3">
            <div className='col-md-5  ' >
            <span className='fs-3' >Contact number :</span>
            <strong className='mx-2 fs-4' >7748833998</strong>
            </div>
            <div className='col-md-7 mt-3   ' >
            <span  >Gmail id :</span>
            <strong >Homentorindia@gmail.com</strong>

             <div  className='mt-3' >Address:
              <strong>22 - Scheme No. 54, PU-4, Vijay Nagar, Indore - 452010, MP</strong>
             </div>
         
            </div>

           
          </div>
        </div>
      </div>
    
    
    </>
  )
}

export default ContactUs