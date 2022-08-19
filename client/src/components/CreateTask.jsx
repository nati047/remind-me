import { Formik } from "formik";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";
import "../styles/Create-Task.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function CreateTask({ setUser, setSortedList }) {
  const day = new Date(Date.now());

  return (
    <Formik
      initialValues={{ description: "", taskType: "", date: "" }}
      validationSchema={Yup.object({
        description: Yup.string()
          .required("Task is required")
          .min(5, "Must be more than 4 charachters"),
        taskType: Yup.string().required("required"),
        date: Yup.date()
          .min(day, "Date can not be in the past")
          .required("date is required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/newTask`, values)
          .then((response) => {
            console.log("new task",response.data);
            resetForm({ values: "" });
            setSubmitting(false);
            swal("Task Created!",{icon: "success"});
            
            setSortedList( prev => [response.data, ...prev]);

          })
          .catch((err) => {
            setSubmitting(false);

            if (err.response.data.error === "Forbidden Access!") {
              swal("Session Timedout");
              setUser({});
              localStorage.removeItem("access-token");
            } else {
              swal("Invalid Input OR Server error!",{icon: "error"});
            }
          });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="form-create-task">
          {formik.isSubmitting && "submitting"}
          <div className="label-error">
            <label className="task-label" htmlFor="description">
              Task
            </label>
            {formik.touched.description && formik.errors.description ? (
              <div className="error-msg">{formik.errors.description}</div>
            ) : (
              <div></div>
            )}
          </div>
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="E.g. cancel subscription"
            {...formik.getFieldProps("description")}
          />
          <div className="label-error">
            <label className="task-label" htmlFor="taskType">
              Reminder Frequency
            </label>
            {formik.touched.taskType && formik.errors.taskType ? (
              <div className="error-msg">{formik.errors.taskType}</div>
            ) : (
              <div></div>
            )}
          </div>
          <select
            id="taskType"
            name="taskType"
            type="text"
            {...formik.getFieldProps("taskType")}
          >
            <option value="">set reminder frequency</option>
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="random">Monthly</option>
          </select>

          <div className="label-error">
            <label className="task-label" htmlFor="date">
              Date
            </label>
            {formik.touched.date && formik.errors.date ? (
              <div className="error-msg">{formik.errors.date}</div>
            ) : (
              <div></div>
            )}
          </div>
          <input
            id="date"
            name="date"
            type="datetime-local"
            {...formik.getFieldProps("date")}
          />
          {formik.isSubmitting ? (
            <span className="task-submitting">
              <Spinner animation="border" role="status"></Spinner>
              Submitting...
            </span>
          ) : (
            <button className="create-button" type="submit">
              Create Task
            </button>
          )}
        </form>
      )}
    </Formik>
  );
}

export default CreateTask;
