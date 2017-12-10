import Lane from '../models/lane';
import uuid from 'uuid';
import Note from '../models/note'

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addLane(req, res) {
  if(!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();

  newLane.save((err, saved) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json({lanes});
  })
}

export function editLane(req, res) {
  const lane = req.body
  if(!lane.id || !lane.name) {
    res.status(403).end();
  }
  Lane.findOneAndUpdate({id: lane.id}, lane, {new: true}, (err, updated) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json({updated});
  })
}


//delete a lane wiht pre hook
export function deleteLane(req, res) {
  Lane.findOne({id: req.params.laneId}).exec( (err, lane) => {
    if(err) {
      res.status(500).send(err);
    }
    if(lane) {
      lane.remove(() => {
        res.status(200).send('Lane deleted succesfull');
      });
    } else {
      res.status(500).send('Bad argument!');
    }
  });
}

/**Delete a lane whitout pre hook */

// export function deleteLane(req, res) {
//   Lane.findOne({id: req.params.laneId}).exec( (err, lane) => {
//     if(err) {
//       res.status(500).send(err);
//     }
//     if(lane) {
//       const notes = lane.notes;
//       notes.forEach(element => {
//         Note.findByIdAndRemove(element._id)
//           .exec(err => {
//             if(err) {
//               res.status(500).send(err);
//             }
//           });
//       });
//       lane.remove(() => {
//         res.status(200).send('Lane deleted succesfull');
//       });
//     } else {
//       res.status(500).send('Bad argument!');
//     }
//   });
// }
