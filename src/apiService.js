import axios from "axios";

const GITHUB_TOKEN = "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";
export const gitlabToken = "glpat-4MUy-vwJCu_yarm5Z1_y"; // Thay bằng token của bạn
export const baseURL = "https://gitlab.taphoaictu.id.vn/api/v4";
const apiClient = axios.create({
  baseURL: baseURL, 
  headers: { Authorization: `Bearer ${gitlabToken}` },
});

export const activatePipeline = async (projectId, branch, pipelineToken) => {
  const response = await apiClient.post(
    `/projects/${projectId}/ref/main/trigger/pipeline?token=${pipelineToken}`
  );
  return response.data;
};

const getCurrentDateTime = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year}-${hours}h${minutes}p${seconds}s`;
};

export const generateTag = async (baseVersion, projectId, branch) => {
  const newTag = `${baseVersion}-${getCurrentDateTime()}`; // Tạo tag mới
  console.log("🚀 ~ generateTag ~ newTag:", newTag);
  return apiClient
    .post(`/projects/${projectId}/repository/tags`, {
      tag_name: newTag,
      ref: branch, // Branch mà bạn muốn tạo tag trên đó
    })
    .then((response) => {
      console.log("Tag created:", response.data);
      return response.data; // Trả về thông tin tag đã tạo
    })
    .catch((error) => {
      console.error(
        "Error creating tag:",
        error.response?.data || error.message
      );
      throw error; // Ném lỗi nếu có
    });
};

export const getPipelineStatus = async (projectId, pipelineId) => {
  // projects/<project_id>/pipelines?per_page=1
  const response = await apiClient.get(
    `/projects/${projectId}/pipelines?per_page=1`
  );
  if (response.status !== 200 || !response.data || response.data.length === 0) {
    return null;
  }
  return response.data[0];
};

export const getLatestGithubAction = async (nameRepo) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/ducvubo/${nameRepo}/actions/runs?per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.data.workflow_runs.length > 0) {
      const latestRun = response.data.workflow_runs[0];
      console.log({
        id: latestRun.id,
        status: latestRun.status,
        created_at: latestRun.created_at,
      });
      let status = '';
        if (latestRun.status === 'completed') {
            status = latestRun.conclusion;
        } else {
            status = latestRun.status;
        }
      return status;
    } else {
      console.log("No workflow runs found.");
      return null;
    }
  } catch (error) {
    console.error(
      "Error fetching GitHub Actions:",
      error.response?.data || error.message
    );
    return null;
  }
};
