import React, { SyntheticEvent } from 'react';
// MUI components
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Grid,
} from '@material-ui/core/';
// Custom components
import { OrderStep } from './OrderStep';
import { PlayerStep } from './PlayerStep';
import { MatchStep } from './MatchStep';
import { BasicDataStep } from './BasicDataStep';
import { IndividualSkillsStep } from './IndividualSkillsStep';
import { TeamplaySkillsStep } from './TeamplaySkillsStep';
import { MotorSkillsStep } from './MotorSkillsStep';
import { SummaryStep } from './SummaryStep';
// Hooks
import { useStepper, useForm } from '../../../hooks';
import { useReportsState } from '../../../context';
// Styles
import { useStyles } from '../styles';
// Utils & data
import { reportFormInitialState } from '../../../data';
import { formatReportObject, getInitialStateFromCurrent } from '../../../utils';

export const ReportsForm = () => {
  const classes = useStyles();
  const [activeStep, handleNext, handleBack, handleReset] = useStepper();

  const reportsContext = useReportsState();

  const { addReport, current, editReport, loading } = reportsContext;

  const initialState = current
    ? getInitialStateFromCurrent(current)
    : reportFormInitialState;

  const [reportData, onInputChange, setReportData] = useForm(initialState);

  const {
    order,
    player,
    match,
    minutesPlayed,
    goals,
    assists,
    yellowCards,
    redCards,
    ballReceptionRating,
    ballReceptionNote,
    holdPassRating,
    holdPassNote,
    gainPassRating,
    gainPassNote,
    keyPassRating,
    keyPassNote,
    defOneOnOneRating,
    defOneOnOneNote,
    airPlayRating,
    airPlayNote,
    positioningRating,
    positioningNote,
    attOneOnOneRating,
    attOneOnOneNote,
    finishingRating,
    finishingNote,
    attackRating,
    attackNote,
    defenseRating,
    defenseNote,
    transitionRating,
    transitionNote,
    leading,
    neglected,
    summary,
    finalRating,
  } = reportData;

  const steps = [
    'Wybierz zlecenie',
    'Wybierz zawodnika',
    'Wybierz mecz',
    'Dane podstawowe',
    'Ocena umiejętności indywidualnych',
    'Ocena współdziałania z partnerami',
    'Ocena potencjału motorycznego',
    'Podsumowanie występu',
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <OrderStep value={order} onChange={onInputChange} current={current} />
        );
      case 1:
        return (
          <PlayerStep
            value={player}
            onChange={onInputChange}
            order={order}
            current={current}
          />
        );
      case 2:
        return (
          <MatchStep
            value={match}
            onChange={onInputChange}
            player={player}
            current={current}
          />
        );
      case 3:
        return (
          <BasicDataStep
            minutesPlayed={minutesPlayed}
            goals={goals}
            assists={assists}
            yellowCards={yellowCards}
            redCards={redCards}
            onChange={onInputChange}
          />
        );
      case 4:
        return (
          <IndividualSkillsStep
            ballReceptionRating={ballReceptionRating}
            ballReceptionNote={ballReceptionNote}
            holdPassRating={holdPassRating}
            holdPassNote={holdPassNote}
            gainPassRating={gainPassRating}
            gainPassNote={gainPassNote}
            keyPassRating={keyPassRating}
            keyPassNote={keyPassNote}
            defOneOnOneNote={defOneOnOneNote}
            defOneOnOneRating={defOneOnOneRating}
            airPlayRating={airPlayRating}
            airPlayNote={airPlayNote}
            positioningRating={positioningRating}
            positioningNote={positioningNote}
            attOneOnOneRating={attOneOnOneRating}
            attOneOnOneNote={attOneOnOneNote}
            finishingRating={finishingRating}
            finishingNote={finishingNote}
            onChange={onInputChange}
            player={player}
          />
        );
      case 5:
        return (
          <TeamplaySkillsStep
            attackRating={attackRating}
            attackNote={attackNote}
            defenseRating={defenseRating}
            defenseNote={defenseNote}
            transitionRating={transitionRating}
            transitionNote={transitionNote}
            onChange={onInputChange}
          />
        );
      case 6:
        return (
          <MotorSkillsStep
            leading={leading}
            neglected={neglected}
            onChange={onInputChange}
          />
        );
      case 7:
        return (
          <SummaryStep
            summary={summary}
            finalRating={finalRating}
            onChange={onInputChange}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formattedReport = formatReportObject(reportData);

    if (current) {
      editReport(current._id, formattedReport);
    } else {
      addReport(formattedReport);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          {current
            ? `Edycja raportu nr ${current._id}`
            : 'Tworzenie nowego raportu'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Wstecz
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Zapisz' : 'Dalej'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button type="submit" className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </form>
      </Grid>
    </Grid>
  );
};
