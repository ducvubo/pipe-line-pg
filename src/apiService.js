import axios from 'axios';

const gitlabToken = 'glpat-4MUy-vwJCu_yarm5Z1_y'; // Thay bằng token của bạn
const apiClient = axios.create({
    baseURL: 'https://gitlab.taphoaictu.id.vn/api/v4',
    headers: { Authorization: `Bearer ${gitlabToken}` },
});

export const activatePipeline = async (projectId, branch, pipelineToken) => {
    const response = await apiClient.post(`/projects/${projectId}/ref/main/trigger/pipeline?token=${pipelineToken}`);
    return response.data;
};

const getCurrentDateTime = () => {
    const now = new Date();
  
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = now.getFullYear();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year}-${hours}h${minutes}p${seconds}s`;
  }

// Hàm kiểm tra xem tag đã tồn tại hay chưa
const checkTagExists = async (projectId, tagName) => {
    try {
        const response = await apiClient.get(`/projects/${projectId}/repository/tags`);
        return response.data.some(tag => tag.name === tagName); // Kiểm tra tag có tồn tại không
    } catch (error) {
        console.error('Error fetching tags:', error.response?.data || error.message);
        return false; // Nếu lỗi, coi như tag không tồn tại
    }
};

// Hàm tạo tag tự động và tránh trùng
export const generateTag = async (baseVersion, projectId, branch) => {
    const newTag = `${baseVersion}-${getCurrentDateTime()}`; // Tạo tag mới
    console.log("🚀 ~ generateTag ~ newTag:", newTag)
    return apiClient.post(`/projects/${projectId}/repository/tags`, {
        tag_name: newTag,
        ref: branch,  // Branch mà bạn muốn tạo tag trên đó
    })
    .then(response => {
        console.log('Tag created:', response.data);
        return response.data; // Trả về thông tin tag đã tạo
    })
    .catch(error => {
        console.error('Error creating tag:', error.response?.data || error.message);
        throw error;  // Ném lỗi nếu có
    });
};

export const getPipelineStatus = async (projectId, pipelineId) => {
    // projects/<project_id>/pipelines?per_page=1
    const response = await apiClient.get(`/projects/${projectId}/pipelines?per_page=1`);
    if (response.status !== 200 || !response.data || response.data.length === 0){
        return null;
    }
    return response.data[0];
};
