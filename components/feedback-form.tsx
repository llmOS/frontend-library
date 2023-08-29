import * as React from 'react'
import {useState} from 'react'
import Textarea from 'react-textarea-autosize'

import { useEnterSubmit } from '../lib/hooks/use-enter-submit'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from './ui/tooltip'
import { IconArrowElbow, IconPlus } from './ui/icons'
import {Feedback} from "../lib/types";

export interface FeedbackProps {
  onSubmit: (feedback: Feedback) => Promise<void>,
  id: string
}

export function FeedbackForm({
  onSubmit,
  id
 }: FeedbackProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const feedbackRef = React.useRef<HTMLTextAreaElement>(null)
  const [isFeedbackFormVisible, setFormVisibility] = useState(true);
  const [isLowScoreDetected, setLowScoreDetected] = useState(false);
  const [selectedValue, setSelectedValue] = useState({result:[""]});
  const [displayIndex, setIndex] = useState(0);

  const addItem = (value: string) => {
      setSelectedValue({ ...selectedValue, result: selectedValue.result.concat([value]) });
    };
  // let displayIndex = 0
  // let selectedValue: string[] = []

  React.useEffect(() => {
    if (feedbackRef.current) {
      feedbackRef.current.focus()
    }
  }, [])

  const handleRadioButtonChange = (event: { target: { value: string, checked: boolean }, preventDefault: () => void  }) => {
    addItem(event.target.value);
    event.target.checked = false;
    if (parseInt(event.target.value) <= 3) {
        setLowScoreDetected(true);
    }
    if (displayIndex == 2) {
        if (isLowScoreDetected)
            setIndex(3);
        else {
            handleFormSubmit(event);
        }
    } else
        setIndex(displayIndex + 1);

  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let feedback_text;
    if (feedbackRef && feedbackRef.current) {
        feedback_text = feedbackRef.current.value || "";
    }
    setFormVisibility(false);
    const feedback = {
        id: id,
        helpfulness: parseInt(selectedValue.result[1]),
        easy_to_understand: parseInt(selectedValue.result[2]),
        correctness: parseInt(selectedValue.result[3]),
        free_form_feedback: feedback_text
    };
    await onSubmit(feedback);
  };

  let helpful = (<div style={{display: 'flex', alignItems: 'center', height: '76px'}}>
          <p>How helpful is the answer?</p>
          <div className="oc-custom-radio-container">
            <label className="oc-custom-radio-label">
              <input type="radio" name="helpfulness" value="1" style={{display: 'none'}} onChange={handleRadioButtonChange}  />
              1
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="helpfulness" value="2" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              2
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="helpfulness" value="3" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              3
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="helpfulness" value="4" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              4
            </label>
            <label className="oc-custom-radio-label" style={{marginRight: '0px'}}>
              <input type="radio" name="helpfulness" value="5" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              5
            </label>
          </div>
        </div>)
  let easy_to_understand = (<div style={{display: 'flex', alignItems: 'center', height: '76px'}}>
          <p>How easy to understand is the answer?</p>
          <div className="oc-custom-radio-container">
            <label className="oc-custom-radio-label">
              <input type="radio" name="easy_to_understand" value="1" style={{display: 'none'}} onChange={handleRadioButtonChange}  />
              1
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="easy_to_understand" value="2" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              2
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="easy_to_understand" value="3" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              3
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="easy_to_understand" value="4" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              4
            </label>
            <label className="oc-custom-radio-label" style={{ marginRight: '0px'}}>
              <input type="radio" name="easy_to_understand" value="5" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              5
            </label>
          </div>
        </div>)
  let correctness = (<div style={{display: 'flex', alignItems: 'center', height: '76px'}}>
          <p>How correct is the answer?</p>
          <div className="oc-custom-radio-container">
            <label className="oc-custom-radio-label">
              <input type="radio" name="correctness" value="1" style={{display: 'none'}} onChange={handleRadioButtonChange}  />
              1
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="correctness" value="2" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              2
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="correctness" value="3" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              3
            </label>
            <label className="oc-custom-radio-label">
              <input type="radio" name="correctness" value="4" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              4
            </label>
            <label className="oc-custom-radio-label" style={{marginRight: '0px'}}>
              <input type="radio" name="correctness" value="5" style={{display: 'none'}} onChange={handleRadioButtonChange} />
              5
            </label>
          </div>
        </div>)

  let freeform = <div style={{height:'auto', maxHeight: '800px', minHeight:'160px', paddingTop:'19px', paddingBottom: '19px', paddingLeft: '26px', paddingRight: '26px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Please provide an ideal answer. This will be used to improve the copilot</p>
            </div>
            <Textarea
              ref={feedbackRef}
              tabIndex={0}
              rows={1}
              placeholder=""
              spellCheck={false}
              className="oc-min-h-[120px] oc-w-full oc-resize-none oc-bg-transparent oc-px-4 oc-py-[1.3rem] focus-within:oc-outline-none sm:oc-text-sm oc-max-h-[540px]"
              style={{border: '1px solid white', borderRadius: '5px', marginTop:'16px', paddingRight: '40px', paddingTop: '10px', paddingBottom: '10px'}}
            />
            <div className="oc-absolute sm:oc-right-4" style={{ position: 'absolute', right: '60px', bottom: '50px'}}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="submit" size="icon">
                    <IconArrowElbow />
                    <span className="oc-sr-only">Send feedback</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send feedback</TooltipContent>
              </Tooltip>
            </div>
          </div>
  let elementsToShow = [helpful, easy_to_understand, correctness, freeform]

  return (
      <>
      {isFeedbackFormVisible &&
   <form onSubmit={handleFormSubmit} ref={formRef}>
      <div className="oc-relative oc-flex oc-max-h-[600px] oc-w-full oc-grow oc-flex-col oc-overflow-hidden oc-bg-background oc-px-8 sm:oc-rounded-md sm:oc-border sm:oc-px-12"
      style={{paddingLeft:'25px', paddingRight:'25px', fontSize: '14px'}}>
        { elementsToShow[displayIndex] }

      </div>
    </form>}
      </>
  )
}
