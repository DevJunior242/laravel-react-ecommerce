 
function ErrorGlobal({error, setError, callback = null}) {

   if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          const arrayErrors = Object.keys(data.errors || {}).reduce((acc, key) => {
            acc[key] = Array.isArray(data.errors[key])
              ? data.errors[key]
              : [data.errors[key]];
            return acc;
          }, {});
          setError(arrayErrors);
          console.warn(arrayErrors);
        } else {
          setError({ general: [data.message || " Something went wrong"] });
          console.warn(data);
        }
      } else {
        setError({ general: [error.message] });
      }
      if (callback) {
        callback();
      }
    }


export default ErrorGlobal
