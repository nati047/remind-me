import { Formik, Field, Form, ErrorMessage, useField, } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import '../styles/Create-Task.css';

function CreateTask() {
 
  const day = new Date(Date.now())
  return (
    <Formik
      initialValues={{ taskName: '', taskType: '', date: '', time: '' }
      }
      validationSchema={Yup.object({
        taskName: Yup.string().required().min(4, 'Must be more than 3 charachters'),
        taskType: Yup.string().required(),
        date: Yup.date().min(day, 'Date can not be in the past').required('date is required'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        setTimeout(() => {
          resetForm({ values: '' })
          setSubmitting(false)
        }, 3000)
      }}

    >
      {formik => (
        <form onSubmit={formik.handleSubmit} className="form-create-task" >
          {formik.isSubmitting && 'submitting'}
          <label htmlFor='taskName' >Task name</label>
          <input
            id='taskName'
            name='taskName'
            type='text'
            {...formik.getFieldProps('taskName')}
            
          />
          {formik.touched.taskName && formik.errors.taskName ? (
            <div>{formik.errors.taskName}</div>
          ) : null}

          <label htmlFor='taskType' >Task Type</label>
          <select
            id='taskType'
            name='taskType'
            type='text'
            {...formik.getFieldProps('taskType')}
          >
            <option value="">select task type</option>
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          {formik.touched.taskType && formik.errors.taskType ? (
            <div>{formik.errors.taskType}</div>
          ) : null}

          <label htmlFor='date' >Date</label>
          <input
            id='date'
            name='date'
            type='datetime-local'
            {...formik.getFieldProps('date')}
          />
          {formik.touched.date && formik.errors.date ? (
            <div>{formik.errors.date}</div>
          ) : <div></div>}

          <label htmlFor='time' >Time</label>
          <input
            id='time'
            name='time'
            type='time'
            {...formik.getFieldProps('time')}
          />
          {formik.touched.time && formik.errors.time ? (
            <div>{formik.errors.time}</div>
          ) : null}

          {formik.isSubmitting ? 
              <span className="task-submitting">
                <Spinner animation="border" role="status">
                </Spinner> 
                Submitting...
              </span> :
            <button className="create-button" type='submit'>Create Task</button>
          }

        </form>)
      }


    </Formik>
  );
}

export default CreateTask;
