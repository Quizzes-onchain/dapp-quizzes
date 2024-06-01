import deleteIcon from '@/public/assets/icons/add-question/delete.svg'
import previewIcon from '@/public/assets/icons/add-question/preview.svg'
import { ChoiceProps, MenuOptionItem } from '../components/add-question'
import { TQuestionItem } from '../store/reducers/question-form.reducer'

export const initialChoiceList: ChoiceProps[] = [
  { id: 'a', value: 'Choice 1', isAns: true },
  { id: 'b', value: 'Choice 2', isAns: false },
  { id: 'c', value: 'Choice 3', isAns: false },
  { id: 'd', value: 'Choice 4', isAns: false },
]

export const menuOptionData: MenuOptionItem[] = [
  { value: 'preview', label: 'Preview', icon: previewIcon },
  { value: 'delete', label: 'Delete', icon: deleteIcon },
]

export const initialQuestion: TQuestionItem = {
  id: 0,
  question: '',
  choices: initialChoiceList,
  point: 0,
  time: 0,
}
