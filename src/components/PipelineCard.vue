<template>
    <Card class="bg-white">
        <template #title>{{ project.name }}</template>
        {{ project.pipelineToken }}
        <template #content>
            <div class="flex flex-col items-start gap-2 my-2">
                <div>Pipeline: #{{ project.pipelines.id }}</div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái:</span>
                    <Tag :severity="getSeverity(project.pipelines.status)" :value="getText(project.pipelines.status)">
                    </Tag>
                </div>
            </div>
        </template>
        <template #footer>
            <Button :disabled="project.pipelines.status === 'running'"
                :label="project.pipelines.status === 'running' || project.pipelines.status === 'pending' ? 'Đang chạy pipeline' : 'Kích hoạt Pipeline'"
                severity="success" @click="triggerPipeline" />
        </template>
    </Card>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';

const props = defineProps(['project']);
const emit = defineEmits(['trigger']);

const triggerPipeline = () => {
    emit('trigger');
};

const getSeverity = (status) => {
    switch (status) {
        case 'created':
            return 'help'
        case 'running':
            return 'info'
        case 'pending':
            return 'warn'
        case 'success':
            return 'success'
        case 'failed':
            return 'danger'
        default:
            return status
    }
}

const getText = (status) => {
    switch (status) {
        case 'created':
            return 'Đã kích hoạt'
        case 'pending':
            return 'Đang chờ'
        case 'running':
            return 'Đang chạy...'
        case 'success':
            return 'Thành công'
        case 'failed':
            return 'Lỗi chạy pipeline'
        default:
            return status
    }
}
</script>