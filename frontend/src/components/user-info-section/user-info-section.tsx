import { memo, useRef, useState } from "react";
import { UserData } from "../../types/auth";
import { ApiRoute, Gender, LOCATIONS, Role, Setting, TRAIN_TYPES, UserLevel } from "../../consts";
import CustomSelect from "../custom-select/custom-select";
import { updateUser } from "../../store/user-process/thunk-actions";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import classNames from "classnames";
import { isUserQuestionnaire } from "../../utils";

type UserInfoSectionProps = {
  user: UserData
}

function UserInfoSectionTemplate({user}: UserInfoSectionProps): JSX.Element {
  const [editStatus, setEditStatus] = useState(false);
  const [formData, setFormData] = useState(user);
  const [avatar, setAvatar] = useState<string>(`${Setting.BaseUrl}/${user.avatar}`);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const formDataChangeHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    const {name, value} = evt.target as HTMLInputElement;
    setFormData({...formData, [name]: value })
  }

  const loadAvatarInputClickHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const file = avatarRef.current?.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  }

  const changeSpecializationHandler = (evt: React.FormEvent) => {
    const {value} = evt.target as HTMLInputElement;
    let newTypes: string[] = [];
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
      setEditStatus(false);
      console.log(avatarRef.current?.files)
      const newUser = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        gender: formData.gender,
        avatar: avatarRef.current?.files?.[0] ?? undefined,
        questionnaire: formData.questionnaire
      }
      if (isUserQuestionnaire(formData.questionnaire) && isUserQuestionnaire(newUser.questionnaire)) {
         newUser.questionnaire.isReadyForTrain = formData.questionnaire.isReadyForTrain
        }
      if (isUserQuestionnaire(formData.questionnaire) && !isUserQuestionnaire(newUser.questionnaire)) {
        newUser.questionnaire.individualTraining = formData.questionnaire.isReadyForTrain;
      }
      dispatch(updateUser(newUser));
    }
  }

  return(
    <section className={
      classNames({
        "user-info-edit": editStatus,
        "user-info": !editStatus
      })
    }>
      <div className={
      classNames({
        "user-info-edit__header": editStatus,
        "user-info__header": !editStatus
      })
    }>
        <div className="input-load-avatar">
          <label>
            <input
              ref={avatarRef}
              className="visually-hidden"
              type="file"
              name="user-photo-1"
              accept="image/png, image/jpeg"
              disabled={!editStatus}
              onChange={loadAvatarInputClickHandler}
            />
            <span className={
              classNames({
                "input-load-avatar__avatar input-load-avatar__btn": true
              })
            }>
            <img
              src={avatar}
              width="98" height="98"
              alt="user photo"
            />
            </span>
          </label>
        </div>
        {
          editStatus &&
          <div className="user-info-edit__controls">
            <button
              className="user-info-edit__control-btn"
              aria-label="обновить"
              onClick={() => avatarRef.current?.click()}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button
              className="user-info-edit__control-btn"
              aria-label="удалить"
              onClick={() => setAvatar('')}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        }

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
            {
              <label>
                {
                  isUserQuestionnaire(formData.questionnaire) &&
                  <input
                    type="checkbox"
                    name="ready-for-training"
                    disabled={!editStatus}
                    checked={formData.questionnaire.isReadyForTrain }
                    onChange={() => isUserQuestionnaire(formData.questionnaire) && setFormData({...formData, questionnaire: {...formData.questionnaire, isReadyForTrain: !formData.questionnaire.isReadyForTrain}})}
                  />
                }
                {
                  !isUserQuestionnaire(formData.questionnaire) &&
                  <input
                    type="checkbox"
                    name="ready-for-training"
                    disabled={!editStatus}
                    checked={ formData.questionnaire.individualTraining }
                    onChange={() => !isUserQuestionnaire(formData.questionnaire) && setFormData({...formData, questionnaire: {...formData.questionnaire, individualTraining: !formData.questionnaire.individualTraining}})}
                  />
                }
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">
                  {user.role === Role.USER ? 'Готов тренироваться' : 'Готов тренировать'}
                </span>
              </label>
            }
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
