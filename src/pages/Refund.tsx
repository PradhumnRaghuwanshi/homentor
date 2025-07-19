import React from "react";
import { useEffect } from "react";

function Refund() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        style={{ backgroundColor: "rgb(245,247,250)" }}
        className="container-fluid "
      >
        <div className="container">
          <div className="row p-0  m-0 ">
            <div className="col-12 py-5 my-auto">
              <div style={{ fontSize: 38, fontWeight: 600 }}>
                REFUNDS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 py-3 ">
            <p>
            Refund policy 
            No Refund Policy, No refunds accepted by HOMENTOR EDU Private Limited.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Refund;
