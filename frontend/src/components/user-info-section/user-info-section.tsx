import { memo, useState } from "react";
import { UserData } from "../../types/auth";
import { ApiRoute, Gender, LOCATIONS, Setting, TRAIN_TYPES, UserLevel } from "../../consts";
import CustomSelect from "../custom-select/custom-select";
import classNames from "classnames";

type UserInfoSectionProps = {
  user: UserData
}

function UserInfoSectionTemplate({user}: UserInfoSectionProps): JSX.Element {
  const [editStatus, setEditStatus] = useState(false);
  const [formData, setFormData] = useState<UserData>(user);

  const formDataChangeHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    const {name, value} = evt.target as HTMLInputElement;
    setFormData({...formData, [name]: value })
  }

  const changeSpecializationHandler = (evt: React.FormEvent) => {
    const {value} = evt.target as HTMLInputElement;
    let newTypes = [];
    if (formData.questionnaire.trainType.includes(value)) {
      newTypes = formData.questionnaire.trainType.filter((type) => type !== value);
    }
    else {
      newTypes = [...formData.questionnaire.trainType, value];
    }
      setFormData({...formData, questionnaire: {...formData.questionnaire, trainType: newTypes}})
  }

  const formSubmitHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!editStatus) {
      setEditStatus(true)
    } else {
      evt.preventDefault();
      console.log('update form data: ', formData);
      setEditStatus(false);
    }

  }

  return(
    <section className="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              disabled={!editStatus}
            />
            <span className={
              classNames({
                "input-load-avatar__avatar input-load-avatar__btn": true
              })
            }>
            <img
              src={`${Setting.BaseUrl}/${user.avatar}`}
              width="98" height="98"
              alt="user photo"
            />
            </span>
          </label>
        </div>
      </div>
      <form
        className="user-info__form"
        action={ApiRoute.UserUpdate}
        method="patch"
      >
        <button
          className="btn-flat btn-flat--underlined user-info__edit-button"
          type="button"
          aria-label="Редактировать"
          onClick={formSubmitHandler}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>{(editStatus) ? 'Сохранить' : 'Редактировать'}</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  disabled={!editStatus}
                  onChange={formDataChangeHandler}
                />
              </span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=" "
                disabled={!editStatus}
                value={formData.description}
                onChange={formDataChangeHandler}
              >
              </textarea>
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                disabled={!editStatus}
                checked={formData.questionnaire.isReadyForTrain}
                onChange={() => setFormData({...formData, questionnaire: {...formData.questionnaire, isReadyForTrain: !formData.questionnaire.isReadyForTrain}})}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">Готов тренироваться</span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info__specialization">
            {
              TRAIN_TYPES.map((type, index) => (
                <div className="btn-checkbox" key={`train-type-${index}`}>
                  <label>
                    <input
                      className="visually-hidden"
                      type="checkbox"
                      name="specialization"
                      value={type}
                      disabled={!editStatus}
                      checked={formData.questionnaire.trainType.includes(type)}
                      onChange={changeSpecializationHandler}
                    />
                    <span className="btn-checkbox__btn">{type}</span>
                  </label>
                </div>
              ))
            }
          </div>
        </div>
        <CustomSelect
            title="Локация"
            items={LOCATIONS}
            cb={(value) => setFormData({...formData, location: value})}
            disableStatus={!editStatus}
            defaultValue={formData.location}
            additionalClassName="user-info__select"
        />
        <CustomSelect
            title="Пол"
            items={Object.values(Gender)}
            cb={(value) => setFormData({...formData, gender: value as Gender})}
            disableStatus={!editStatus}
            defaultValue={formData.gender}
            additionalClassName="user-info__select"
        />
        <CustomSelect
            title="Уровень"
            items={Object.values(UserLevel)}
            cb={(value) => setFormData({...formData, questionnaire: {...formData.questionnaire, userLevel: value as UserLevel} })}
            disableStatus={!editStatus}
            defaultValue={formData.questionnaire.userLevel}
            additionalClassName="user-info__select"
        />
      </form>
    </section>
  );
}

const UserInfoSection = memo(UserInfoSectionTemplate);

export default UserInfoSection;
