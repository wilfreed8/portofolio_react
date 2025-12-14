import { Edit, Trash } from 'lucide-react';
type Priority = "urgente" |"moyenne"| "basse" ;
type todo = {
  id:number,
  text:string,
  priority: Priority
} ;
type Props = {
    todo:todo ,
    onDelete : () => void ,
    isSelected: boolean ,
    onToggleSelect : () => void ,
    onEdit : () => void ,
    isEditing : boolean ,
}

const TodoItem = ({todo , onDelete,isSelected,onToggleSelect,onEdit,isEditing}:Props,) => {
  return (
    <li className='p-3'>
    <div className='flex justify-between item-center'>
        <div  className='flex items-center gap-2'>
           <input type="checkbox"  className='checkbox  checkbox-primary checked:bg-primary shadow-sm bg-white/70 checkbox-sm' checked={isSelected} onChange={onToggleSelect}/>
           <span className='text-md font-bold'>
            <span >
                {todo.text}
            </span>
           </span>
           <span className={`badge badge-sm badge-soft px-1 ${todo.priority=="urgente" ? "badge-error" : todo.priority=="moyenne" ? "badge-warning" : "badge-success" }  `}>
            {todo.priority}
           </span>
        </div>
        <div className='flex gap-4'>
    <button  className='btn btn-info btn-soft ' onClick={onEdit}><Edit className='w-4 h-4'/></button>
    <button disabled={isEditing} className='btn disbaled:bg-gray-500 disabled:cursor-not-allowed btn-error btn-soft ' onClick={onDelete}><Trash className='w-4 h-4'/></button>
        </div>
    </div>
    </li>
  )
}

export default TodoItem
