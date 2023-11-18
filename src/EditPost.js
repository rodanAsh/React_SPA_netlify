 import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'

const EditPost = () => {
  const {posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit} = useContext(DataContext)
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
    },[post, setEditTitle, setEditBody])
  return (
    <main className='NewPost'>
      {
        editTitle &&
        <>
        <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="PostTitle">Title:</label>
            <input
            id='postTitle' 
            type="text" 
            required
            value={editTitle}
            onChange={(e)=>setEditTitle(e.target.value)}
            />
            <label htmlFor="PostBody">Post:</label>
            <textarea 
            id="postBody"
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button
            onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        </>
      }
      {!editTitle &&
        <>
          <h2>Page not found</h2>
          <p>Well, that's disappointing</p>
          <Link to='/'>
          <p>Visit our homeoage</p>
          </Link>
        </>
      }
    </main>
  )
}

export default EditPost