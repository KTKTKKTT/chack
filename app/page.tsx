'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // 🔽 初回ロード時にlocalStorageから読み込み
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // 初回だけ初期データを入れる
      setTasks([
        { id: 1, name: '英語冊子', done: false },
        { id: 2, name: '漢字', done: false },
        { id: 3, name: '古文', done: false },
        { id: 4, name: '漢字', done: false },
        { id: 5, name: '数学', done: false },
        { id: 6, name: '国語要約３つ', done: false },
        { id: 7, name: '作文', done: false },
        { id: 8, name: '読書', done: false },
      ]);
    }
  }, []);

  // 🔽 tasksが変わるたび保存
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>チェックリスト</h1>

      {tasks.map(task => (
        <div key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span style={{
              marginLeft: "8px",
              textDecoration: task.done ? "line-through" : "none"
            }}>
              {task.name}
            </span>
          </label>
        </div>
      ))}
      <button onClick={() => {
        localStorage.removeItem("tasks");
    setTasks([]); // 画面もリセット
    }}>
  リセット
</button>
    </div>
  );
}