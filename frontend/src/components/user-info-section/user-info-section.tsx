import { memo, useRef, useState } from "react";
import { UserData } from "../../types/auth";
import { ApiRoute, Gender, LOCATIONS, Role, Setting, TRAIN_TYPES, UserLevel, ValidationSetting } from "../../consts";
import CustomSelect from "../custom-select/custom-select";
import { updateUser } from "../../store/user-process/thunk-actions";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import classNames from "classnames";
import { isCoachQuestionnaire, isUserQuestionnaire } from "../../utils";

type UserInfoSectionProps = {
  user: UserData
}

function UserInfoSectionTemplate({user}: UserInfoSectionProps): JSX.Element {
  const [editStatus, setEditStatus] = useState(false);
  const [formData, setFormData] = useState(user);
  const [avatar, setAvatar] = useState<string>(`${Setting.BaseUrl}/${user.avatar}`);  
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();

  const formDataChangeHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    const {name, value} = evt.target as HTMLInputElement;
    setFormData({...formData, [name]: value });    
  }

  const loadAvatarInputClickHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const file = avatarRef.current?.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  }

  const changeTrainingStatusHandler = () => {
    if (isCoachQuestionnaire(formData.questionnaire)) {
      setFormData({
        ...formData,
        questionnaire: {
          ...formData.questionnaire,
          individualTraining: !formData.questionnaire.individualTraining
        }
      })
    }
    if (isUserQuestionnaire(formData.questionnaire)) {
      setFormData({
        ...formData,
        questionnaire: {
          ...formData.questionnaire,
          isReadyForTrain: !formData.questionnaire.isReadyForTrain
        }
      })
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
    evt.preventDefault();    
    if (!editStatus) {
      setEditStatus(true)
    } else {      
      const isNotError = (formData.name.length >= ValidationSetting.userNameMinLength && formData.name.length <= ValidationSetting.userNameMaxLength) &&
        (formData.description.length >= ValidationSetting.CoachDescriptionMinLength && formData.description.length <= ValidationSetting.CoachDescriptionMaxLength) && (formData.questionnaire.trainType.length > 0);      
      
      const avatarFile = avatarRef.current?.files?.[0] ?? avatar;

      if (formRef.current && avatar && isNotError) {       
        const data = new FormData(formRef.current);
        data.append('location', formData.location);
        data.append('avatar', avatarFile);
        data.append('userLevel', formData.questionnaire.userLevel);
        data.append('gender', formData.gender);
        if (isUserQuestionnaire(formData.questionnaire)) {
          data.set('isReadyForTrain', formData.questionnaire.isReadyForTrain.toString())
        } else {
          data.set('individualTraining', formData.questionnaire.individualTraining.toString())
        }
        dispatch(updateUser({user: data, cb: () => setEditStatus(false)}));
      } 
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
          })}
      >
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
      { avatar.length === 0 &&
        <span className="custom-input__error">
          {`Загрузите аватар`}
        </span>
      }
      <form
        ref={formRef}
        className="user-info__form"
        action={ApiRoute.UserUpdate}
        method="post"
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
          <div className={
            classNames({
              "custom-input custom-input--readonly user-info__input": true,
              "custom-input--error": !(formData.name.length >= ValidationSetting.userNameMinLength && formData.name.length <= ValidationSetting.userNameMaxLength)
            })
          }>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  minLength={ValidationSetting.userNameMinLength}
                  maxLength={ValidationSetting.userNameMaxLength}
                  required
                  value={formData.name}
                  disabled={!editStatus}
                  onChange={formDataChangeHandler}                  
                />
              </span>
              { !(formData.name.length >= ValidationSetting.userNameMinLength && formData.name.length <= ValidationSetting.userNameMaxLength) &&
                <span className="custom-input__error">
                  {`Имя должно быть длиной от ${ValidationSetting.userNameMinLength} до ${ValidationSetting.userNameMaxLength} символов`}
                </span>
              }
            </label>
          </div>
          <div className={
            classNames({
              "custom-textarea custom-textarea--readonly user-info__textarea": true,
              "custom-textarea--error": !(formData.description.length >= ValidationSetting.CoachDescriptionMinLength && formData.description.length <= ValidationSetting.CoachDescriptionMaxLength)
            })
          }>
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                minLength={ValidationSetting.CoachDescriptionMinLength}
                maxLength={ValidationSetting.CoachDescriptionMaxLength}
                required
                placeholder=" "
                disabled={!editStatus}
                value={formData.description}
                onChange={formDataChangeHandler}
              >
              </textarea>
              { !(formData.description.length >= ValidationSetting.CoachDescriptionMinLength && formData.description.length <= ValidationSetting.CoachDescriptionMaxLength) &&
                <span className="custom-textarea__error">
                  {`Описание должно быть длиной от ${ValidationSetting.CoachDescriptionMinLength} до ${ValidationSetting.CoachDescriptionMaxLength} символов`}
                </span>
              }
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
              <label>
                {
                  isUserQuestionnaire(formData.questionnaire) &&
                  <>
                    <input
                      type="checkbox"
                      name="isReadyForTrain"
                      disabled={!editStatus}
                      checked={ formData.questionnaire.isReadyForTrain }
                      onChange={changeTrainingStatusHandler}
                    />
                  </>
                }
                {
                  isCoachQuestionnaire(formData.questionnaire) &&
                  <>
                    <input
                      type="checkbox"
                      name="individualTraining"
                      disabled={!editStatus}
                      checked={ formData.questionnaire.individualTraining }
                      onChange={changeTrainingStatusHandler}
                    />
                  </>
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
                      name="trainType"
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
            { formData.questionnaire.trainType.length === 0 &&
              <span className="custom-input__error">
                {`Требуется выбрать хотя бы один вариант, но не более трёх`}
              </span>}
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
