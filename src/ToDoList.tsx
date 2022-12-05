import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  }; 
  
    return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do " />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  password_check: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "123@email.com",
      firstname: "kk",
      lastname: "k",
      username: "nickname",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password_check) {
      setError(
        "password_check",
        { message: "password are not the same" },
        { shouldFocus: true }
      );
    }
    // form 에러
    // setError("extraError", { message: "SERVER OFFLINE" });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          style={{
            borderColor: errors?.email?.message ? "red" : "",
            marginBottom: "10px",
          }}
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[a-z]+\.com$/,
              message: "only emails allowed",
            },
          })}
          placeholder={errors?.email?.message ? "email is required" : "Email"}
        />
        <span style={{ marginBottom: "10px", color: "red", fontWeight: 600 }}>
          {errors?.email?.message}
        </span>

        <input
          style={{
            borderColor: errors?.firstname?.message ? "red" : "",
            marginBottom: "10px",
          }}
          {...register("firstname", {
            required: "first name is required",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,

              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder={
            errors?.firstname?.message ? "first name is required" : "First Name"
          }
        />
        <span style={{ marginBottom: "10px", color: "red", fontWeight: 600 }}>
          {errors?.firstname?.message}
        </span>

        <input
          style={{
            borderColor: errors?.lastname?.message ? "red" : "",
            marginBottom: "10px",
          }}
          {...register("lastname", { required: "last name is required" })}
          placeholder={
            errors?.lastname?.message ? "last name is required" : "Last Name"
          }
        />
        <span style={{ marginBottom: "10px", color: "red", fontWeight: 600 }}>
          {errors?.lastname?.message}
        </span>

        <input
          style={{
            borderColor: errors?.username?.message ? "red" : "",
            marginBottom: "10px",
          }}
          {...register("username", {
            required: "username is required",
            minLength: 5,
          })}
          placeholder={
            errors?.username?.message ? "username is required" : "Username"
          }
        />
        <span style={{ marginBottom: "10px", color: "red", fontWeight: 600 }}>
          {errors?.username?.message}
        </span>

        <input
          style={{
            borderColor: errors?.password?.message ? "red" : "",
            marginBottom: "10px",
          }}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "your password is too short",
            },
          })}
          placeholder={
            errors?.password?.message ? "password is required" : "Password"
          }
        />
        <span style={{ marginBottom: "10px", color: "red", fontWeight: 600 }}>
          {errors?.password?.message}
        </span>

        <input
          style={{
            borderColor: errors?.password_check?.message ? "red" : "",
            marginBottom: "10px",
          }}
          {...register("password_check", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "your password is too short",
            },
          })}
          placeholder={
            errors?.password_check?.message
              ? "password_check is required"
              : "Password_check"
          }
        />
        <span style={{ marginBottom: "10px", color: "red", fontWeight: 600 }}>
          {errors?.password_check?.message}
        </span>

        <button>Add</button>

        <span
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
            color: "red",
            fontWeight: 600,
            fontSize: 35,
          }}
        >
          {errors?.extraError?.message}
        </span>
      </form>
    </div>
  );
}

export default ToDoList;
