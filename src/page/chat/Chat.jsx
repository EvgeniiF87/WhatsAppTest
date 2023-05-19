import useAppContext from "../../hooks/useAppContext";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import ContactItem from "../../components/contact-item/ContactItem";
import style from "./chat.module.scss";

const Chat = () => {
  const { idInstance, contacts, setContacts, setIsUser } = useAppContext();

  const { register, handleSubmit, reset } = useForm();

  const handleAddContact = (dataForm) => {
    setContacts([...contacts, { phone: dataForm.phone }]);
    reset();
  };

  return (
    <div className={style.wrap}>
      <div className={style.left_bar}>
        <div className={style.info_block}>
          <div>
            ВАШ ID: <span>{idInstance}</span>
          </div>
          <div>
            <button onClick={() => setIsUser(false)}>выйти</button>
          </div>
        </div>

        <div className={style.add_phone_block}>
          <form onSubmit={handleSubmit(handleAddContact)}>
            <input {...register("phone")} placeholder="номер телефона" />

            <button>добавить</button>
          </form>
        </div>

        <div className={style.contacts_bloc}>
          {contacts.length ? (
            contacts.map(({ phone }) => (
              <ContactItem
                key={`${Math.random(1, 100)}-${phone}`}
                phone={phone}
              />
            ))
          ) : (
            <div className={style.empty}>Список контактов пуст</div>
          )}
        </div>
      </div>

      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
