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
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { open } from "fs";

interface Props {
  request: IRequest;
  isMySentRequest: boolean;
}

const RequestCard = ({ request, isMySentRequest }: Props) => {
  const [receiver, setReceiver] = useState<IUser>();
  const [item, setItem] = useState<IListItem>();
  const theme = useTheme();
  const { deleteRequest } = useUser();
  const [deleteConfirmationpOpen, setDeleteConfirmationpOpen] = useState(false);
  const [denyConfirmationOpen, setDenyConfirmationOpen] = useState(false);
  const [acceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const [reqStatus, setReqStatus] = useState<ReqStatus>(request.accepted);
  const pending = ReqStatus.pending;
  const accepted = ReqStatus.accepted;
  const denied = ReqStatus.denied;

  //Delete req popup
  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationpOpen(true);
  };

 const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationpOpen(false);
  };

  // deny req popup
  const handleDenyConfirmationOpen = () => {
    setDenyConfirmationOpen(true)
  }

  const handleDenyConfirmationClose = () => {
    setDenyConfirmationOpen(false)
  }

  //accept request popup
  const handleAcceptConfirmationOpen = () => {
    setAcceptConfirmationOpen(true)
  }

  const handleAcceptConfirmationClose = () => {
    setAcceptConfirmationOpen(false)
  }

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
    handleDeleteConfirmationClose();
  };

  const handleRequestStatus = async (status: ReqStatus) => {
    const updateAcceptedReq = {
      ...request,
      accepted: status,
    };
    if (request.id) {
      try {
        await setDoc(
          doc(db, "requests", request?.id),
          updateAcceptedReq
        );
        setReqStatus(status);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const acceptRequest = () => {
    handleRequestStatus(ReqStatus.accepted)
    handleAcceptConfirmationClose()
  }

  const denyRequest = () => {
    handleRequestStatus(ReqStatus.denied)
    handleDenyConfirmationClose()
  }

  const popUpText = {
    delete: {
      title: "Are you sure you want to delete this request?",
      description: "This action is irreversable.",
      confirmButton: 'Delete request'
    },
    deny: {
      title: 'Are you sure you want to deny this request?',
      description: '"This action is irreversable."',
      confirmButton: 'Deny request'
    },
    accept: {
      title: 'Are you sure you want to accept this request?',
      description: '"This action is irreversable."',
      confirmButton: 'Accept request'
    }
  }

  return (
    <Box
      sx={{
        padding: "1rem",
        boxShadow: "0px 0px 15px -3px #000000",
        minWidth: '20rem',
        maxWidth: '20rem',
        height: { xs: "15rem", md: "20rem", lg: "15rem", xl: "15rem" },
        borderRadius: theme.shape.buttonBorderRadius,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        margin: '0 1rem'
      }}
    >
      <CardMedia
        sx={[imgStyle, grid.pic]}
        component="img"
        src={item?.image}
      />
      <Typography sx={[textContainer, grid.reqFromOrTo]}>
        {isMySentRequest ? (
          <>
            {" "}
            <span style={titleStyle}>Request To: </span>
            <Link to={`/profile/${receiver?.id}`} key={request.id}>
              <span>{receiver?.displayName}</span>
            </Link>
          </>
        ) : (
          <>
            {" "}
            <span style={titleStyle}>Request from: </span>
            <Link to={`/profile/${request.fromUserId}`} key={request.id}>
              <span>{request?.fromUserName}</span>
            </Link>
          </>
        )}
      </Typography>
      <Typography sx={[textContainer, grid.reqFor]}>
        <span style={titleStyle}>Request for: </span>{" "}
        {item ? item.title : "no item"}
      </Typography>
      <Typography sx={[textContainer, grid.price]}>
        <span style={titleStyle}>Price per day: </span>{" "}
        {request.priceTotal} kr
      </Typography>
      <Typography sx={[textContainer, grid.message]}>
        <span style={titleStyle}>Message: </span>Hi! I would like to
        rent the projector for a couple of days. Cheers!
      </Typography>
      <Box sx={reqStatusContainer}>
        {/* mySent && pending */}
        {isMySentRequest && reqStatus == pending ? (
          <>
            <Typography sx={[reqStatusStyle, pendingStyle]} variant="h5">Pending...</Typography>
            <Button sx={denyBtn} variant="outlined" onClick={handleDeleteConfirmationOpen}>
              <DeleteForeverIcon />
            </Button>
          </>
        ) : null}

        {/* mySent && accepted */}
        {isMySentRequest && reqStatus === accepted ? (
          <Typography sx={[acceptedStyle, reqStatusStyle]} variant="h5">
            Your request is accepted!
          </Typography>
        ) : null}

        {/* mySent && denied */}
        {isMySentRequest && reqStatus === denied ? (
          <Typography sx={[reqStatusStyle, deniedStyle]} variant="h5">
            You have denied this request
          </Typography>
        ) : null}

        {/* notMySent && pending */}
        {!isMySentRequest && reqStatus === pending ? (
          <Box sx={buttonsContainer}>
            <Button
              variant="outlined"
              sx={[button, denyBtn]}
              onClick={() => {
                handleDenyConfirmationOpen();
                // handleRequestStatus(ReqStatus.denied);
              }}
            >
              Deny
            </Button>
            <Button
              variant="contained"
              sx={[button, acceptBtn]}
              onClick={() => {
                handleAcceptConfirmationOpen()
                // handleRequestStatus(ReqStatus.accepted);
              }}
            >
              Accept
            </Button>
          </Box>
        ) : null}

        {/* notMySent && accepted */}
        {!isMySentRequest && reqStatus === accepted ? (
          <Typography sx={[reqStatusStyle, acceptedStyle]} variant="h5">
            You have accepted this request
          </Typography>
        ) : null}

        {/* notMySent && denied */}
        {!isMySentRequest && reqStatus === denied ? (
          <>
            <Typography sx={[reqStatusStyle, deniedStyle]} variant="h5">
              You have denied this request
            </Typography>
            <Button sx={deleteButton}
              variant="outlined"
              onClick={handleDeleteRequest}
            >
              <DeleteForeverIcon />
            </Button>
          </>
        ) : null}
      </Box>
          {/* Deny request */}
      <Popup
        open={denyConfirmationOpen}
        handleClose={handleDenyConfirmationClose}
        action={denyRequest}
        title={popUpText.deny.title}
        description={popUpText.deny.description}
        confirmButton={popUpText.deny.confirmButton}
      />
      {/* Delete request confirmation */}
      <Popup
        open={deleteConfirmationpOpen}
        handleClose={handleDeleteConfirmationClose}
        action={handleDeleteRequest}
        title={popUpText.delete.title}
        description={popUpText.delete.description}
        confirmButton={popUpText.delete.confirmButton}
      />
      {/* Accept request */}
      <Popup
        open={acceptConfirmationOpen}
        handleClose={handleAcceptConfirmationClose}
        action={acceptRequest}
        title={popUpText.accept.title}
        description={popUpText.accept.description}
        confirmButton={popUpText.accept.confirmButton}
      />
    </Box>
  );
};

const grid = {
  pic: {
    gridColumn: "1 / 2",
    gridRow: "1 / 3",
  },
  reqFor: {
    gridColums: "2 / 3",
  },
  reqFromOrTo: {
    gridColumn: "3 / 4",
    gridRow: "1 / 2",
  },
  price: {
    gridColumn: "2 / 4",
    gridRow: "2 / 3",
  },
  message: {
    gridColumn: "1 / 3",
    gridRow: "3 / 4",
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

const reqStatusContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gridColumn: "1 / 4",
};

const button = {
  width: "5rem",
  height: "2rem",
  textTransform: 'none'
};

const deleteButton = {
  borderRadius: '100px',
};

const buttonsContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
};

const denyBtn = {
  color: 'red',
  border: '1px solid red'
};

const acceptBtn = {
  color: 'white',
  backgroundColor: 'green'
}

const acceptedStyle = {
  color: 'green',
}

const pendingStyle = {
  color: 'orange'
}

const deniedStyle = {
  color: 'red'
}

const reqStatusStyle = {
  fontSize: '1rem'
}


export default RequestCard;
