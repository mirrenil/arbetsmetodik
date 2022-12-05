import { CSSPropertiesWithMultiValues } from '@emotion/serialize';
import {
  Box,
  CardMedia,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import React, { CSSProperties, useEffect, useState } from 'react';
import camera from '../Assets/Images/Film-Photography.png';
import { IRequest, IUser, IListItem } from '../Interfaces';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  request: IRequest;
  isMySentRequest: boolean
}

const RequestCard = ({ request, isMySentRequest }: Props) => {
  const [sender, setSender] = useState<IUser>();
  const [receiver, setReceiver] = useState<IUser>();
  const [item, setItem] = useState<IListItem>();
  const theme = useTheme();

  useEffect(() => {
    getReqSender();
    getReceiver();
    getReqItem();
  }, []);

  const getReqSender = async () => {
    const user = await getUser(request.fromUser);
    if (user) {
      setSender(user as IUser);
    }
  };

  const getReceiver = async () => {
    const user = await getUser(request.toUser);
    if (user) {
      setReceiver(user as IUser);
    }
  }

  const getUser = async (userId: string) => {
    let user = {};
    const data = query(collection(db, 'users'));
    const req = await getDocs(data);
    req.forEach((doc) => {
      if (doc.id == userId) {
        user = {
          email: doc.data().email,
          displayName: doc.data().displayName,
          id: doc.id
        }
      }
    });
    return user;
  }

  const getReqItem = async () => {
    const data = query(collection(db, 'listings'));
    const req = await getDocs(data);
    req.forEach((doc) => {
      if (doc.id == request.itemId) {
        setItem({
          title: doc.data().title,
          description: doc.data().description,
          image: doc.data().image,
          price: doc.data().price,
          category: doc.data().category,
          id: doc.data().id
        });
      }
    });
  };

  return (
    <Box
      sx={{
        padding: '1rem',
        boxShadow: '0px 0px 15px -3px #000000',
        width: '25rem',
        height: '15rem',
        borderRadius: theme.shape.buttonBorderRadius,
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
      }}
    >
      <CardMedia sx={[imgStyle, grid.pic]} component="img" src={camera} />
      <Typography sx={[textContainer, grid.reqFrom]}>
        {isMySentRequest ?
          (
            <span style={titleStyle}>Request To: {receiver?.email ? receiver.email : 'no name'}</span>
          ) : (
            <span style={titleStyle}>Request from: {sender?.email ? sender.email : 'no name'}</span>
          )
        }

      </Typography>
      <Typography sx={[textContainer, grid.reqFor]}>
        <span style={titleStyle}>Request for: </span> {item ? item.title : 'no item'}
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
      {isMySentRequest ?
        (
          <Typography>Pending...</Typography>
        ) : (
          <div style={buttonsContainer}>
            <Button sx={[button, decline]}>Decline</Button>
            <Button variant="contained" sx={button}>
              Accept
            </Button>
          </div>
        )}
    </Box>
  );
};

const grid = {
  pic: {
    gridColumn: '1 / 2',
    gridRow: '1 / 3',
  },
  reqFrom: {
    gridColums: '2 / 3',
  },
  timeFrom: {
    gridColumn: '3 / 4',
    gridRow: '1 / 2',
  },
  reqFor: {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
  },
  timeTo: {
    gridColumn: '3 / 4',
    gridRow: '2 / 3',
  },
  message: {
    gridColumn: '1 / 3',
    gridRow: '3 / 4',
  },
  price: {
    gridColumn: '3 / 4',
    gridRow: '3 / 5',
  },
};

const imgStyle = {
  height: 'auto',
  width: 'auto',
  objectFit: 'scale-down',
  marginRight: '1rem',
};

const titleStyle: CSSProperties = {
  color: 'grey',
};

const textContainer: CSSPropertiesWithMultiValues = {
  display: 'flex',
  flexDirection: 'column',
};

const buttonsContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gridColumn: '1 / 4',
};

const button = {
  width: '5rem',
  height: '2rem',
  border: 'none',
  color: 'white',
};

const decline = {
  backgroundColor: 'red',
};

export default RequestCard;
