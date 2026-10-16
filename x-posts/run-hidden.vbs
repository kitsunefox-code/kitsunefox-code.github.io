' 毎時のニュース投稿を、黒いウィンドウを出さずに走らせるための起動役。
' タスクスケジューラから wscript.exe でこれを呼ぶ。
' node を直接 /TR に書くと、毎時コンソールが一瞬開いて邪魔になるため。
Option Explicit
Dim sh, fso, here
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' このvbsは x-posts/ に置く。プロジェクト直下はひとつ上。
here = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName))

sh.CurrentDirectory = here
' 0 = ウィンドウを出さない, False = 終了を待たない
sh.Run "cmd /c node scripts\hourly.mjs", 0, False
