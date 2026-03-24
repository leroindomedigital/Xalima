import os

file_path = r"c:\Users\HP\Desktop\Code Xalima\src\app\pages\AdminDashboard.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
skip_next = False
for i, line in enumerate(lines):
    if "</th>" in line and i + 2 < len(lines) and "</tr>" in lines[i+1] and "tbody" in lines[i+2]:
        # Missing </thead>
        new_lines.append(line)
        new_lines.append(lines[i+1])
        new_lines.append("                       </thead>\n")
        continue
    if "</tr>" in line and i > 0 and "</th>" in lines[i-1] and "tbody" in lines[i+1]:
        # Already handled by the "</th>" check or needs to be handled
        continue
    if "</tbody>" in line and i + 1 < len(lines) and "</tbody>" in lines[i+1] and "</table>" in lines[i+2]:
        new_lines.append(line)
        skip_next = True
        continue
    if skip_next and "</tbody>" in line:
        skip_next = False
        continue
    new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)
