import React, { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    window.scrollTo({top:0,behavior:"instant"});
  }, []);

  return (
    <>
      <div className="container-fluid  text-center">
        <div
          className="d-flex flex-column align-items-center "
          style={{ backgroundColor: "rgb(253,237,232)" }}
        >
          <div className="d-flex flex-column align-items-center py-5 col-md-6 px-2 text-center ">
            <h2 className="fw-bold  ">
              
              Bringing the{" "}
              <strong style={{ color: "rgb(42,80,254)" }}>
                {" "}
                highest quality teachers,
              </strong>
              to support every child's educational ambitions
            </h2>
            <p
              style={{ lineHeight: "1.5rem", fontSize: "1.4rem" }}
              className="text-center mt-4  "
            >
             Our mission is clear: Bring the best teachers worldwide into our community, arm them with top-notch resources, and empower them to create personalized learning experiences for each student.

            </p>
          </div>
        </div>

        <div className="text-center justify-content-center d-flex">
          <div className="container row p-0 m-0 text-center justify-content-evenly pt-5 pb-5 ">
            <h1 className="fw-bold ">What We Value</h1>

            <div className="col-lg-3 mt-3  ">
              <div
                style={{
                  backgroundColor: "#001b2e",
                  borderBottom: "10px solid #ffefd3",
                  borderRight: "10px solid #ffefd3",
                  borderLeft: "4px solid #ffefd3",
                  borderTop: "2px solid #ffefd3",
                  borderRadius: 15,
                }}
                className="p-2 text-white"
              >
                <h4 className="text-start  fw-bold mt-5 ">
                  High-quality execution
                </h4>
                <p className="text-start mt-4" style={{ fontSize: "18px" }}>
                  We are dedicated to upholding excellence in all aspects of our
                  work, placing a strong emphasis on quality rather than
                  quantity.
                </p>
              </div>
            </div>
            <div className="col-lg-3 mt-3 p-2 ">
              <div
                style={{
                  backgroundColor: "#001b2e",
                  borderBottom: "10px solid #ffefd3",
                  borderRight: "10px solid #ffefd3",
                  borderLeft: "4px solid #ffefd3",
                  borderTop: "2px solid #ffefd3",
                  borderRadius: 15,
                }}
                className="p-4 pb-1 text-white"
              >
                <h4 className="text-start fw-bold mt-3 ">
                  Customer-centric approach
                </h4>
                <p className="text-start mt-2" style={{ fontSize: "18px" }}>
                  We prioritize our customers, always aiming to exceed their
                  expectations and leave a positive impression.
                </p>
              </div>
            </div>
            <div className="col-lg-3 mt-3">
              <div
                style={{
                  backgroundColor: "#001b2e",
                  borderBottom: "10px solid #ffefd3",
                  borderRight: "10px solid #ffefd3",
                  borderLeft: "4px solid #ffefd3",
                  borderTop: "2px solid #ffefd3",
                  borderRadius: 15,
                }}
                className="p-3 text-white "
              >
                <h4 className="text-start fw-bold mt-3 ">Ownership</h4>
                <p className="text-start" style={{ fontSize: "18px" }}>
                  We trust each person to take responsibility for their actions,
                  understanding that their commitment directly impacts the
                  team's success.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-5 pb-5 ">
          <h1 className="fw-bold">Our Team</h1>
          <div className="row justify-content-evenly text-center p-0 my-0  mx-5 px-5 mt-5  ">
            <div className="col-md-3 mx-2 my-2 ">
              <div>
                <img
                  width={220}
                  style={{
                    backgroundColor: "rgb(255,247,12)",
                    borderRadius: "100%",
                  }}
                  className="img-fluid hp"
                  src=""
                  alt=""
                />
              </div>

              <div className="text-center mt-4">
                <h3 className="fw-bolder ">Prashant Pansey</h3>
                <h5>Founder & CEO</h5>
              </div>
            </div>
            <div className="col-md-3 mx-2 my-2 ">
              <div>
                <img
                  width={220}
                  style={{
                    backgroundColor: "rgb(255,247,12)",
                    borderRadius: "100%",
                  }}
                  className="img-fluid hp "
                  src=""
                  alt=""
                />
              </div>

              <div className="text-center mt-4">
                <h3 className="fw-bolder ">Yogesh Makode</h3>
                <h5>CTO</h5>
              </div>
            </div>
           
           
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
