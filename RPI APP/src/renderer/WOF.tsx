/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
// @ts-ignore
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import background2 from '../../assets/Backgounds/modern.jpeg';
import Letter, { starts } from './components/Letter';

export interface Player {
  id: string;
  name: string;
  full_name: string;
  totalScore: number;
  terminalId: string;
  eliminated: boolean;
}
export enum RoundType {
  TOSSUP = 'TOSSUP',
  MYSTERY = 'MYSTERY',
  EXPRESS_PRIZE = 'EXPRESS-PRIZE',
  BONUS = 'BONUS',
}

export interface RoundData {
  round: number;
  roundType: RoundType;
  word: string;
  cattagory: string;
  roundScores: {
    player: string;
    score: number;
  }[];
  time: number;
  winner: string;
}

async function createWOWRound(type: RoundType, challangeSet?: string[]) {
  return new Promise<{
    round: number;
    roundType: RoundType;
    word: string;
    cattagory: string;
    roundScores: {
      player: string;
      score: number;
    }[];
    time: number;
    winner: string;
  }>((resolve, reject) => {
    window.electron.ipcRenderer.sendMessage('getPuzzle', {
      type,
      challangeSet,
    });
    window.electron.ipcRenderer.once('getPuzzle', (event: any, puzzle: any) => {
      switch (type) {
        case RoundType.TOSSUP:
          resolve({
            round: 1,
            roundType: RoundType.TOSSUP,
            word: event?.puzzle,
            cattagory: event?.category,
            roundScores: [],
            time: 0,
            winner: '',
          });
          break;
        case RoundType.MYSTERY:
          resolve({
            round: 2,
            roundType: RoundType.MYSTERY,
            word: event?.puzzle,
            cattagory: event?.category,
            roundScores: [],
            time: 0,
            winner: '',
          });
          break;
        case RoundType.EXPRESS_PRIZE:
          resolve({
            round: 3,
            roundType: RoundType.EXPRESS_PRIZE,
            word: event?.puzzle,
            cattagory: event?.category,
            roundScores: [],
            time: 0,
            winner: '',
          });
          break;
        case RoundType.BONUS:
          resolve({
            round: 4,
            roundType: RoundType.BONUS,
            word: event?.puzzle,
            cattagory: event?.category,
            roundScores: [],
            time: 0,
            winner: '',
          });
          break;
        default:
          throw new Error('Invalid Round Type');
      }
    });
  });
}
export function RenderWords(props: { puzzel: string }) {
  const { puzzel } = props;
  let currentLine = 0;
  let currentColumn = 0;
  const requiredColumns = [0, 0, 0, 0];
  const columnOffset = [0, 0, 0, 0];

  let requiredRows = 0;
  // build a grid of letters that is centered
  for (let index = 0; index < puzzel.split(' ').length; index++) {
    const word = puzzel.split(' ')[index];
    if (
      starts[requiredRows].columnCount -
        requiredColumns[requiredRows] -
        word.length <=
      0
    ) {
      requiredColumns[requiredRows]--;
      requiredRows += 1;
    }
    requiredColumns[requiredRows] += word.length + 1;
  }
  requiredRows += 1;
  if (requiredRows <= 2) {
    currentLine = 1;
  }
  //make columnShifts
  for (let index = 0; index < 4 - currentLine; index++) {
    columnOffset[index + currentLine] = Math.round(
      (starts[index + currentLine].columnCount - requiredColumns[index]) / 2,
    );
  }
  currentColumn = columnOffset[currentLine];
  return (
    <>
      {puzzel.split(' ').map((word, indexWord) => {
        return (
          <div
            key={indexWord}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {word.split('').map((letter, indexLetter) => {
              if (
                indexLetter === 0 &&
                starts[currentLine].columnCount -
                  currentColumn -
                  word.length +
                  1 <=
                  0
              ) {
                console.log(
                  'new line',
                  word,
                  'starts',
                  starts[currentLine].columnCount,
                  'length',
                  word.length,
                  'currentColumn',
                  currentColumn,
                  'offset',
                  columnOffset[currentLine],
                );
                currentLine += 1;
                currentColumn = 0 + (columnOffset[currentLine] ?? 0);
              }
              const letterProps = {
                row: currentLine,
                column: currentColumn,
                letter,
              };
              currentColumn += 1;
              if (word.length === indexLetter + 1) {
                currentColumn += 1;
              }
              return (
                <Letter
                  key={indexLetter}
                  row={letterProps.row}
                  column={letterProps.column}
                  letter={' '}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export function WOF() {
  const [gameConfigs, setGameConfigs] = useState({
    players: 2,
    rounds: 3,
    difficulty: 'easy',
  });
  const [gameData, setGameData] = useState<{
    players: Player[];
    roundData: RoundData[];
    currentRound: number;
    inPlay: boolean;
  }>({
    players: [],
    roundData: [],
    currentRound: 0,
    inPlay: false,
  });
  useEffect(() => {
    const updatePuzzels = async () => {
      const puzzels = await Promise.all([
        createWOWRound(RoundType.TOSSUP),
        createWOWRound(RoundType.MYSTERY),
        createWOWRound(RoundType.EXPRESS_PRIZE),
        createWOWRound(RoundType.BONUS),
      ]);
      setGameData({
        players: [
          {
            id: '1',
            name: 'Player 1',
            full_name: 'Player 1',
            totalScore: 0,
            terminalId: '1',
            eliminated: false,
          },
          {
            id: '2',
            name: 'Player 2',
            full_name: 'Player 2',
            totalScore: 0,
            terminalId: '2',
            eliminated: false,
          },
        ],
        roundData: puzzels,
        currentRound: 0,
        inPlay: true,
      });
    };
    updatePuzzels();
  }, []);

  const navigate = useNavigate();
  const [confimation, setConfimation] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'rgba(104, 156, 248)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setConfimation({
              open: true,
              title: 'Are you sure?',
              message: 'Are you sure you want to go back?',
              onConfirm: () => {
                navigate('/');
              },
              onCancel: () => {
                setConfimation({
                  open: false,
                  title: '',
                  message: '',
                  onConfirm: () => {},
                  onCancel: () => {},
                });
              },
            });
          }}
        >
          Back
        </Button>
      </div>
      <Dialog
        open={confimation?.open}
        onClose={confimation?.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confimation?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confimation?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confimation?.onCancel}>Disagree</Button>
          <Button onClick={confimation?.onConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <RenderWords
        puzzel={
          gameData.inPlay === true
            ? gameData.roundData[gameData.currentRound].word
            : ''
        }
      />
      <Typography
        sx={{
          position: 'absolute',
          bottom: 95,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2em',
          color: 'white',
        }}
      >
        {gameData.inPlay === true
          ? gameData.roundData[gameData.currentRound].cattagory
          : 'Paused'}
      </Typography>

      <img
        src={background2}
        alt="background"
        style={{
          width: '105%',
        }}
      />
    </div>
  );
}

export default WOF;
