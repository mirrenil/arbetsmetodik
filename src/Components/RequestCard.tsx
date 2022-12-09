import { CSSPropertiesWithMultiValues } from "@emotion/serialize";
import { Box, CardMedia, Typography, useTheme, Button } from "@mui/material";
import React, { CSSProperties, useEffect, useState } from "react";
import { IRequest, IUser, IListItem, ReqStatus } from "../Interfaces";
import {
  getDocs,
  collection,
  query,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "../Contexts/UserContext";
import Popup from "./popup";
import { request } from "express";

interface Props {
  request: IRequest;
  isMySentRequest: boolean;
}

const RequestCard = ({ request, isMySentRequest }: Props) => {
  const [receiver, setReceiver] = useState<IUser>();
  const [item, setItem] = useState<IListItem>();
  const theme = useTheme();
  const { deleteRequest } = useUser();
  const [open, setOpen] = useState(false);
  const [reqStatus, setReqStatus] = useState<ReqStatus>(request.accepted);
  const pending = ReqStatus.pending;
  const accepted = ReqStatus.accepted;
  const declined = ReqStatus.declined;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getReceiver();
    getReqItem();
  }, []);

  const getReceiver = async () => {
    try {
      const docRef = doc(db, "users", request.toUser);
      const snap = await getDoc(docRef);
      const userDoc = snap.data();

      if (userDoc) {
        const user = {
          email: userDoc.email,
          displayName: userDoc.displayName,
          id: userDoc.id,
        };
        if (user) {
          setReceiver(user as IUser);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReqItem = async () => {
    const data = query(collection(db, "listings"));
    try {
      const req = await getDocs(data);
      req.forEach((doc) => {
        if (doc.id === request.itemId) {
          setItem({
            authorID: doc.data().authorID,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            price: doc.data().price,
            category: doc.data().category,
            location: doc.data().location,
            id: doc.data().id,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRequest = () => {
    if (request.id) {
      deleteRequest(request?.id);
    }
    handleClose();
  };

  const handleRequestStatus = async (status: ReqStatus) => {
    const updateAcceptedReq = {
      ...request,
      accepted: status,
    };
    if (request.id) {
      try {
        await setDoc(doc(db, "requests", request?.id), updateAcceptedReq);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateCardStatus = (reqStatus: ReqStatus) => {
    console.log(reqStatus);
    setReqStatus(reqStatus);
  };

  // const renderBasedOnRequestStatus = () => {
  //   let jsx: any;

  //   switch (isMySentRequest) {
  //     // If user sent request
  //     case true:
  //       switch (request.accepted) {
  //         case ReqStatus.pending:
  //           jsx = (
  //             <>
  //               <Typography variant="h5">Pending...</Typography>
  //               <Button variant="contained" onClick={handleOpen}>
  //                 Delete request
  //               </Button>
  //             </>
  //           );

  //           break;
  //         case ReqStatus.accepted:
  //           jsx = (
  //             <Typography variant="h5">Your request is accepted!</Typography>
  //           );

  //           break;
  //         case ReqStatus.declined:
  //           jsx = (
  //             <>
  //               <Typography variant="h5">
  //                 Your request has been declined
  //               </Typography>
  //               <Button variant="contained" onClick={handleDeleteRequest}>
  //                 Delete request
  //               </Button>
  //             </>
  //           );

  //           break;
  //       }
  //       break;
  //     // if user received request
  //     case false:
  //       switch (request.accepted) {
  //         case ReqStatus.pending:
  //           jsx = (
  //             <div>
  //               <Button
  //                 sx={[button, decline]}
  //                 onClick={() => {
  //                   handleRequestStatus(ReqStatus.declined);
  //                   updateCardStatus(ReqStatus.declined);
  //                 }}
  //               >
  //                 Decline
  //               </Button>
  //               <Button
  //                 variant="contained"
  //                 sx={button}
  //                 onClick={() => {
  //                   handleRequestStatus(ReqStatus.accepted);
  //                   updateCardStatus(ReqStatus.accepted);
  //                 }}
  //               >
  //                 Accept
  //               </Button>
  //             </div>
  //           );

  //           break;
  //         case ReqStatus.accepted:
  //           jsx = (
  //             <Typography variant="h5">
  //               You have accepted this request
  //             </Typography>
  //           );

  //           break;
  //         case ReqStatus.declined:
  //           jsx = (
  //             <Typography variant="h5">
  //               You have declined this request
  //             </Typography>
  //           );

  //           break;
  //       }
  //   }
  //   return jsx;
  // };

  return (
    <Box
      sx={{
        padding: "1rem",
        boxShadow: "0px 0px 15px -3px #000000",
        maxWidth: { xs: "20rem", md: "25rem", lg: "25rem", xl: "25rem" },
        height: { xs: "none", md: "15rem", lg: "15rem", xl: "15rem" },
        borderRadius: theme.shape.buttonBorderRadius,
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        marginBottom: "2rem",
      }}
    >
      <CardMedia sx={[imgStyle, grid.pic]} component="img" src={item?.image} />
      <Typography sx={[textContainer, grid.reqFrom]}>
        {isMySentRequest ? (
          <>
            {" "}
            <span style={titleStyle}>Request To: </span>
            <span>{receiver?.displayName}</span>
          </>
        ) : (
          <>
            {" "}
            <span style={titleStyle}>Request from: </span>
            <span>{request?.fromUserName}</span>
          </>
        )}
      </Typography>
      <Typography sx={[textContainer, grid.reqFor]}>
        <span style={titleStyle}>Request for: </span>{" "}
        {item ? item.title : "no item"}
      </Typography>
      <Typography sx={[textContainer, grid.timeFrom]}>
        <span style={titleStyle}>Time from: </span> Friday, 25 nov
      </Typography>
      <Typography sx={[textContainer, grid.timeTo]}>
        <span style={titleStyle}>Time to: </span> Sunday, 27 nov
      </Typography>
      <Typography sx={[textContainer]}>
        <span style={titleStyle}>Price total: </span> {request.priceTotal} kr
      </Typography>
      <Typography sx={[textContainer, grid.message]}>
        <span style={titleStyle}>Message: </span>Hi! I would like to rent the
        projector for a couple of days. Cheers!
      </Typography>
      <Box sx={buttonsContainer}>
        
        {/* mySent && pending */}
        {isMySentRequest && reqStatus == pending ? (
          <>
            <Typography variant="h5">Pending...</Typography>
            <Button variant="contained" onClick={handleOpen}>
              Delete request
            </Button>
          </>
        ) : null}

        {/* mySent && accepted */}
        {isMySentRequest && reqStatus === accepted ? (
          <Typography variant="h5">Your request is accepted!</Typography>
        ) : null}

        {/* mySent && declined */}
        {isMySentRequest && reqStatus === declined ? (
          <Typography variant="h5">You have declined this request</Typography>
        ) : null}

        {/* notMySent && pending */}
        {!isMySentRequest && reqStatus === pending ? (
          <div>
            <Button
              sx={[button, decline]}
              onClick={() => {
                handleRequestStatus(ReqStatus.declined);
                updateCardStatus(ReqStatus.declined);
              }}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              sx={button}
              onClick={() => {
                handleRequestStatus(ReqStatus.accepted);
                updateCardStatus(ReqStatus.accepted);
              }}
            >
              Accept
            </Button>
          </div>
        ) : null}

        {/* notMySent && accepted */}
        {!isMySentRequest && reqStatus === accepted ? (
          <Typography variant="h5">You have accepted this request</Typography>
        ) : null}

        {/* notMySent && declined */}
        {!isMySentRequest && reqStatus === declined ? (
          <Typography variant="h5">You have declined this request</Typography>
        ) : null}
      </Box>

      <Popup
        open={open}
        handleClose={handleClose}
        handleDeleteRequest={handleDeleteRequest}
      />
    </Box>
  );
};

const grid = {
  pic: {
    gridColumn: "1 / 2",
    gridRow: "1 / 3",
  },
  reqFrom: {
    gridColums: "2 / 3",
  },
  timeFrom: {
    gridColumn: "3 / 4",
    gridRow: "1 / 2",
  },
  reqFor: {
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
  },
  timeTo: {
    gridColumn: "3 / 4",
    gridRow: "2 / 3",
  },
  message: {
    gridColumn: "1 / 3",
    gridRow: "3 / 4",
  },
  price: {
    gridColumn: "3 / 4",
    gridRow: "3 / 5",
  },
};

const imgStyle = {
  height: "5rem",
  width: "7rem",
  objectFit: "contain",
  marginRight: "1rem",
};

const titleStyle: CSSProperties = {
  color: "grey",
};

const textContainer: CSSPropertiesWithMultiValues = {
  display: "flex",
  flexDirection: "column",
};

const buttonsContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gridColumn: "1 / 4",
};

const button = {
  width: "5rem",
  height: "2rem",
  border: "none",
  color: "white",
};

const decline = {
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "#cc0000",
  },
};

export default RequestCard;
