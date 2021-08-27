import { render, fireEvent } from '@testing-library/react';
import SimpleForm from './SimpleForm';


describe('SimpleForm Tests', () => {
    const testProps = { 
            className:"testForm", 
            INITIAL_STATE:{ testInput: "" }, 
            onSubmit: () => {},
            submitText:"Test Submit", 
            errors:[]
        }
    test("doesn't blow up", () => {
        render(<SimpleForm {...testProps}/>);
    });

    test("matchesSnapshot", () => {
        const { asFragment } = render(<SimpleForm {...testProps}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    test("gets form data back when submitted", () => {
        const testInputData = "test input data";
        
        let submittedValue = false;
        const { getByLabelText, getByText } = render(<SimpleForm {...testProps} onSubmit={data => submittedValue=data}/>);
        const input = getByLabelText("testInput:");
        const submitBtn = getByText("Test Submit");
        fireEvent.change(input, { target:{ value: testInputData} });        
        
        expect(submittedValue).toBe(false);

        fireEvent.click(submitBtn);
        expect(submittedValue).toEqual({ testInput: testInputData });
    });

    test("Errors are displayed", () => {
        const testErrorText = "DB ERROR";

        const { getByText } = render(<SimpleForm {...testProps} errors={[ testErrorText ]} />);
        const errorText = getByText(testErrorText);
        expect(errorText).toBeInTheDocument();
    });
    test("can display multiple errors", () => {
        const testErrorTexts = ["DB ERROR", "Name Required"];

        const { getByText } = render(<SimpleForm {...testProps} errors={testErrorTexts} />);
        expect(getByText(testErrorTexts[0])).toBeInTheDocument();
        expect(getByText(testErrorTexts[1])).toBeInTheDocument();


    });
    

});
