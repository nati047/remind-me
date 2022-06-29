import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap';
import '../styles/Create-Task.css';
import axios from 'axios';

function CreateTask() {
  const day = new Date(Date.now())

  return (
    <Formik
      initialValues={{ description: '', taskType: '', date: '', time: '' }
      }
      validationSchema={Yup.object({
        description: Yup.string().required().min(4, 'Must be more than 3 charachters'),
        taskType: Yup.string().required(),
        date: Yup.date().min(day, 'Date can not be in the past').required('date is required'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        axios.post(`${process.env.REACT_APP_API_URL}/api/newTask`, values)
        .then( response => {
          console.log(response);
          resetForm({ values: '' });
          setSubmitting(false);
        })
        .catch( err => {  
          setSubmitting(false);
          console.log("client error \n",err);
        });
        
      }}

    >
      {formik => (
        <form onSubmit={formik.handleSubmit} className="form-create-task" >
          {formik.isSubmitting && 'submitting'}
          <div className="label-error">
            <label className="task-label" htmlFor='description' >Task</label>
            {formik.touched.description && formik.errors.description ? (
                <div className='error-msg' >{formik.errors.description}</div>
              ) : <div></div>}
          </div>
          <input
            id='description'
            name='description'
            type='text'
            {...formik.getFieldProps('description')}

          />

          <div className="label-error">
            <label className="task-label" htmlFor='taskType' >Task Type</label>
            {formik.touched.taskType && formik.errors.taskType ? (
              <div className='error-msg' >{formik.errors.taskType}</div>
            ) : <div></div>}
          </div>
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

          <div className="label-error">
            <label className="task-label" htmlFor='date' >Date</label>
            {formik.touched.date && formik.errors.date ? (
              <div className='error-msg' >{formik.errors.date}</div>
            ) : <div></div>}
          </div>
          <input
            id='date'
            name='date'
            type='datetime-local'
            {...formik.getFieldProps('date')}
          />


          {/* <label htmlFor='time' >Time</label>
          <input
            id='time'
            name='time'
            type='time'
            {...formik.getFieldProps('time')}
          />
          {formik.touched.time && formik.errors.time ? (
            <div>{formik.errors.time}</div>
          ) : null} */}

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
